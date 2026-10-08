import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

// Saves a website enquiry into the admin panel (Sanity) and, when an email
// provider is configured, notifies the team.
//
// This file ends in ".server.ts" on purpose: it is only built where the host can
// run server code (Vercel). A static-only build skips it, and the enquiry form
// then falls back to WhatsApp — see next.config.ts.
//
// Needed environment variables on the host:
//   SANITY_PROJECT_ID, SANITY_DATASET   – the content project
//   SANITY_WRITE_TOKEN                  – a token with "Editor" rights (kept secret)
// Optional, for email alerts through Resend (https://resend.com):
//   RESEND_API_KEY, ENQUIRY_NOTIFY_EMAIL, ENQUIRY_FROM_EMAIL

export const runtime = "nodejs";

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

export async function POST(request: Request) {
  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (tooMany(ip)) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  let body: Body;
  try {
    // A real enquiry is a few hundred bytes; measure what was actually sent, not just the header.
    const raw = await request.text();
    if (raw.length > 10_000) return NextResponse.json({ error: "Invalid request" }, { status: 413 });
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    body = parsed as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Bots fill every field, including the hidden one. Pretend success and store nothing.
  if (text(body.website, 100)) return NextResponse.json({ ok: true });

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
    return NextResponse.json({ error: "Please enter your name and a valid phone number." }, { status: 422 });
  }

  const projectId = process.env.SANITY_PROJECT_ID;
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!projectId || !token) {
    // Not configured: say so, and let the form fall back to WhatsApp rather than pretend.
    console.error("Enquiry not saved: SANITY_PROJECT_ID / SANITY_WRITE_TOKEN are not set.");
    return NextResponse.json({ error: "Enquiries are not configured on this server." }, { status: 503 });
  }

  try {
    const client = createClient({ projectId, dataset: process.env.SANITY_DATASET || "production", apiVersion: "2025-02-19", token, useCdn: false });
    await client.create({ _type: "enquiry", status: "new", receivedAt: new Date().toISOString(), ...enquiry });
  } catch (error) {
    console.error("Enquiry not saved:", error);
    return NextResponse.json({ error: "Could not save the enquiry." }, { status: 502 });
  }

  // Email alert is best-effort: the enquiry is already safely stored.
  const { RESEND_API_KEY, ENQUIRY_NOTIFY_EMAIL, ENQUIRY_FROM_EMAIL } = process.env;
  if (RESEND_API_KEY && ENQUIRY_NOTIFY_EMAIL && ENQUIRY_FROM_EMAIL) {
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
        body: JSON.stringify({ from: ENQUIRY_FROM_EMAIL, to: ENQUIRY_NOTIFY_EMAIL.split(",").map((e) => e.trim()), subject: `New enquiry: ${enquiry.name}${enquiry.trip ? ` — ${enquiry.trip}` : ""}`, text: lines.join("\n") }),
      });
      if (!res.ok) console.error("Enquiry email failed:", res.status, await res.text());
    } catch (error) {
      console.error("Enquiry email failed:", error);
    }
  }

  return NextResponse.json({ ok: true });
}
