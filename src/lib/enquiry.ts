// Shared Web API handler for Next.js and Cloudflare Pages; secrets stay server-side.
export type EnquiryEnv = {
  RESEND_API_KEY?: string;
  ENQUIRY_FROM_EMAIL?: string;
  ENQUIRY_NOTIFY_EMAIL?: string;
  SANITY_PROJECT_ID?: string;
  SANITY_DATASET?: string;
  SANITY_WRITE_TOKEN?: string;
};

type Body = Record<string, unknown>;
const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Best-effort flood guard: at most 5 enquiries per visitor address in 10 minutes. It lives in
// memory, so it resets when the server restarts; the host's own firewall is the stronger defence.
const recent = new Map<string, number[]>();
function tooMany(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 600_000);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > 5;
}

export async function handleEnquiry(request: Request, env: EnquiryEnv) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: "Invalid origin" }, { status: 403 });
  }
  const ip = request.headers.get("cf-connecting-ip") || (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
  if (ip && tooMany(ip)) return Response.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  let body: Body;
  try {
    const reader = request.body?.getReader();
    if (!reader) throw new Error("empty body");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 10_000) {
        await reader.cancel();
        return Response.json({ error: "Invalid request" }, { status: 413 });
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    const raw = new TextDecoder().decode(bytes);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    body = parsed as Body;
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  // Bots fill every field, including the hidden one. Pretend success and store nothing.
  if (text(body.website, 100)) return Response.json({ ok: true });

  const enquiry = {
    name: text(body.name, 80),
    phone: text(body.phone, 20),
    trip: text(body.trip, 120),
    travellers: text(body.travellers, 60),
    month: text(body.month, 40),
    message: text(body.message, 1000),
    page: text(body.page, 200),
  };
  if (enquiry.name.length < 2 || !/^\+?(?:[ \-]?[0-9]){8,15}$/.test(enquiry.phone)) {
    return Response.json({ error: "Please enter your name and a valid phone number." }, { status: 422 });
  }

  const { RESEND_API_KEY, ENQUIRY_FROM_EMAIL } = env;
  const recipient = env.ENQUIRY_NOTIFY_EMAIL || "info@mytripworld.net";
  if (!RESEND_API_KEY || !ENQUIRY_FROM_EMAIL) {
    console.error("Enquiry email service is not configured.");
    return Response.json({ error: "Enquiries are temporarily unavailable." }, { status: 503 });
  }

  const lines = [
    `Name: ${enquiry.name}`,
    `Phone: ${enquiry.phone}`,
    enquiry.trip && `Trip: ${enquiry.trip}`,
    enquiry.travellers && `Travellers: ${enquiry.travellers}`,
    enquiry.month && `Travel month: ${enquiry.month}`,
    enquiry.message && `Message: ${enquiry.message}`,
    enquiry.page && `Sent from: ${enquiry.page}`,
  ].filter(Boolean);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({ from: ENQUIRY_FROM_EMAIL, to: recipient.split(",").map((e) => e.trim()), subject: `New enquiry: ${enquiry.name}${enquiry.trip ? ` — ${enquiry.trip}` : ""}`.replace(/[\r\n]/g, " "), text: lines.join("\n") }),
    });
    const receipt = await res.json().catch(() => null) as { id?: string } | null;
    if (!res.ok || !receipt?.id) {
      console.error("Enquiry email rejected:", res.status);
      return Response.json({ error: "Could not send the enquiry." }, { status: 502 });
    }
  } catch {
    console.error("Enquiry email request failed.");
    return Response.json({ error: "Could not send the enquiry." }, { status: 502 });
  }

  // Optional admin copy. Email delivery does not depend on Sanity credentials.
  if (env.SANITY_PROJECT_ID && env.SANITY_WRITE_TOKEN) {
    try {
      const saved = await fetch(`https://${env.SANITY_PROJECT_ID}.api.sanity.io/v2025-02-19/data/mutate/${env.SANITY_DATASET || "production"}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${env.SANITY_WRITE_TOKEN}`, "Content-Type": "application/json" },
        signal: AbortSignal.timeout(5_000),
        body: JSON.stringify({ mutations: [{ create: { _type: "enquiry", status: "new", receivedAt: new Date().toISOString(), ...enquiry } }] }),
      });
      if (!saved.ok) console.error("Enquiry admin copy failed:", saved.status);
    } catch {
      console.error("Enquiry admin copy request failed.");
    }
  }
  return Response.json({ ok: true });
}
