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

// Turns the email provider's rejection into a short, non-secret reason for the logs and the
// response. It never includes the API key, the recipient or anything the visitor typed.
function rejection(status: number, name: string | undefined, message: string | undefined) {
  const m = `${name ?? ""} ${message ?? ""}`.toLowerCase();
  if (m.includes("not verified") || m.includes("verify a domain") || m.includes("from domain")) return "sender_domain_not_verified";
  if (m.includes("testing emails") || m.includes("own email address")) return "provider_test_mode";
  if (status === 401 || m.includes("api key") || m.includes("api_key")) return "api_key_rejected";
  if (status === 429) return "provider_rate_limited";
  if (status === 422 || m.includes("invalid `from`") || m.includes("invalid_from")) return "sender_address_invalid";
  return "provider_error";
}
// The domain part of the configured sender, e.g. "mytripworld.net". Not a secret.
const senderDomain = (from: string) => /@([a-z0-9.-]+)/i.exec(from)?.[1]?.toLowerCase() ?? "unreadable";

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
    const receipt = await res.json().catch(() => null) as { id?: string; name?: string; message?: string } | null;
    if (!res.ok || !receipt?.id) {
      const reason = rejection(res.status, receipt?.name, receipt?.message);
      // Provider status, error type and message, plus which sender domain this deployment used.
      console.error("Enquiry email rejected:", JSON.stringify({ providerStatus: res.status, name: receipt?.name, message: receipt?.message, reason, senderDomain: senderDomain(ENQUIRY_FROM_EMAIL) }));
      // 500 rather than 502: Cloudflare replaces a 502 from a function with its own HTML error page.
      return Response.json({ error: "Could not send the enquiry.", reason, providerStatus: res.status, senderDomain: senderDomain(ENQUIRY_FROM_EMAIL) }, { status: 500 });
    }
  } catch (error) {
    const reason = error instanceof Error && error.name === "TimeoutError" ? "provider_timeout" : "provider_unreachable";
    console.error("Enquiry email request failed:", reason);
    return Response.json({ error: "Could not send the enquiry.", reason }, { status: 500 });
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
