"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { whatsappLink } from "@/lib/content/link";
import type { Contact } from "@/lib/content/types";
import { CheckIcon, WhatsAppIcon } from "./icons";

// "whatsapp": WhatsApp was opened straight from the button press. "fallback": saving failed
// after a wait, when browsers no longer allow opening a new tab, so the visitor taps a button.
type State = "idle" | "sending" | "sent" | "whatsapp" | "fallback";

// Where the host runs /api/enquiry, the enquiry is sent to the team by email. On a
// static-only host the form hands the same details to WhatsApp instead, so an
// enquiry is never lost silently.
const hasApi = Boolean(process.env.ENQUIRY_API);
export function EnquiryFormClient({ contact, trips, defaultTrip = "", defaultMessage = "" }: { contact: Contact; trips: string[]; defaultTrip?: string; defaultMessage?: string }) {
  const pathname = usePathname();
  const [state, setState] = useState<State>("idle");
  const [form, setForm] = useState({ name: "", phone: "", trip: defaultTrip, travellers: "", month: "", message: defaultMessage, website: "" });
  const [error, setError] = useState("");

  // Carry over what the visitor already chose in the search (month, travellers, tour type).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const travellers = [q.get("travellers"), q.get("type")].filter(Boolean).join(", ").slice(0, 60);
    const month = (q.get("month") ?? "").slice(0, 40);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the address bar is only readable after the page loads
    if (travellers || month) setForm((f) => ({ ...f, travellers: f.travellers || travellers, month: f.month || month }));
  }, []);

  const set = (key: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const summary = () =>
    [
      `Hello ${contact.name}, I would like a quote.`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.trip && `Trip: ${form.trip}`,
      form.travellers && `Travellers: ${form.travellers}`,
      form.month && `Travel month: ${form.month}`,
      form.message && `Notes: ${form.message}`,
    ]
      .filter(Boolean)
      .join("\n");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!hasApi) {
      // Opened directly from the button press, so the browser does not block it.
      window.open(whatsappLink(contact, summary()), "_blank", "noopener");
      setState("whatsapp");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, page: pathname }),
      });
      if (res.status === 422 || res.status === 429) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? "Please check your name and phone number.");
        setState("idle");
        return;
      }
      const receipt = await res.json().catch(() => null);
      if (!res.ok || receipt?.ok !== true) throw new Error(String(res.status));
      setState("sent");
    } catch {
      setState("fallback");
    }
  };

  const mailHref = `mailto:${contact.email}?subject=${encodeURIComponent("Trip enquiry")}&body=${encodeURIComponent(summary())}`;
  const shell = "rounded-[1.75rem] bg-white p-6 shadow-[0_40px_80px_-50px_rgba(11,26,42,0.6)] ring-1 ring-ink/5 md:p-9";

  if (state === "sent" || state === "whatsapp" || state === "fallback") {
    return (
      <div className={shell} role="status" aria-live="polite">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-ink">
          <CheckIcon className="h-6 w-6" />
        </span>
        <p className="mt-5 font-display text-3xl text-ink">{state === "sent" ? `Thank you, ${form.name.split(" ")[0]}.` : "One more step"}</p>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
          {state === "sent"
            ? "We have received your enquiry and our team will call or message you shortly."
            : state === "whatsapp"
              ? "Your enquiry is written out in WhatsApp. Please press Send there so it reaches our team. If WhatsApp did not open, use the button below."
              : "We could not save your enquiry just now. Please send it on WhatsApp with the button below, or call us."}
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <a href={whatsappLink(contact, summary())} target="_blank" rel="noopener" className="btn btn-gold !whitespace-normal text-center">
            <WhatsAppIcon className="h-4 w-4" />
            {state === "sent" ? "Also message us on WhatsApp" : state === "whatsapp" ? "Open WhatsApp again" : "Send my enquiry on WhatsApp"}
          </a>
          <a href={contact.phoneHref} className="btn btn-outline">
            Call {contact.phone}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={shell}>
      <p className="font-display text-3xl text-ink">Plan my trip</p>
      <p className="mt-2 text-sm text-muted">Tell us a little and we will reply with a tailored quote.</p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="eq-name">Full name *</label>
          <input id="eq-name" className="field" required maxLength={80} autoComplete="name" value={form.name} onChange={set("name")} placeholder="Your name" />
        </div>
        <div>
          <label className="field-label" htmlFor="eq-phone">Phone number *</label>
          <input id="eq-phone" className="field" required type="tel" maxLength={20} pattern="\+?(?:[ \-]?[0-9]){8,15}" title="Enter a phone number with at least 8 digits" autoComplete="tel" inputMode="tel" value={form.phone} onChange={set("phone")} placeholder="+91" />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="eq-trip">Where would you like to go?</label>
          <select id="eq-trip" className="field" value={form.trip} onChange={set("trip")}>
            <option value="">Not sure yet — suggest something</option>
            {trips.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
            <option value="Custom / other destination">Custom / other destination</option>
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="eq-travellers">Travellers</label>
          <input id="eq-travellers" className="field" maxLength={60} value={form.travellers} onChange={set("travellers")} placeholder="e.g. 2 adults, 1 child" />
        </div>
        <div>
          <label className="field-label" htmlFor="eq-month">Travel month</label>
          <input id="eq-month" className="field" maxLength={40} value={form.month} onChange={set("month")} placeholder="e.g. December" />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="eq-message">Anything else?</label>
          <textarea id="eq-message" className="field min-h-28 resize-y" maxLength={1000} value={form.message} onChange={set("message")} placeholder="Budget, hotel preference, special occasions…" />
        </div>
        {/* Honeypot: real visitors never see or fill this field. */}
        <div className="hidden" aria-hidden>
          <label htmlFor="eq-website">Website</label>
          <input id="eq-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
      <div className="mt-7 flex flex-col gap-3">
        <button type="submit" className="btn btn-gold disabled:opacity-60" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <a href={whatsappLink(contact, summary())} target="_blank" rel="noopener" className="btn btn-outline !whitespace-normal text-center">
          <WhatsAppIcon className="h-4 w-4 shrink-0" />
          Send on WhatsApp instead
        </a>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted">
        Your details are used only to respond to this enquiry. See our{" "}
        <Link href="/privacy-policy/" className="underline underline-offset-4">privacy policy</Link>. Prefer email?{" "}
        <a href={mailHref} className="underline underline-offset-4">Write to {contact.email}</a>.
      </p>
    </form>
  );
}
