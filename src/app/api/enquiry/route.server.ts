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

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
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
  if (enquiry.name.length < 2 || !/^[+0-9][0-9 \-]{7,}$/.test(enquiry.phone)) {
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
