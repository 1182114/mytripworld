"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { packages } from "@/lib/packages";
import { site, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

// No backend needed: the form opens WhatsApp (or email) with the enquiry
// pre-written, so it reaches the team on the channel they already use.
export function EnquiryForm({ defaultTrip = "" }: { defaultTrip?: string }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    trip: defaultTrip,
    travellers: "",
    month: "",
    message: "",
  });

  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const buildMessage = () =>
    [
      "Hello My Trip World, I would like a quote.",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.trip && `Trip: ${form.trip}`,
      form.travellers && `Travellers: ${form.travellers}`,
      form.month && `Travel month: ${form.month}`,
      form.message && `Notes: ${form.message}`,
    ]
      .filter(Boolean)
      .join("\n");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.open(whatsappLink(buildMessage()), "_blank", "noopener");
  };

  const mailHref = `mailto:${site.email}?subject=${encodeURIComponent("Trip enquiry")}&body=${encodeURIComponent(buildMessage())}`;

  return (
    <form onSubmit={onSubmit} className="rounded-[1.75rem] bg-white p-6 shadow-[0_40px_80px_-50px_rgba(11,26,42,0.6)] ring-1 ring-ink/5 md:p-9">
      <p className="font-display text-3xl text-ink">Plan my trip</p>
      <p className="mt-2 text-sm text-muted">Tell us a little and we will reply with a tailored quote.</p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="eq-name">Full name *</label>
          <input id="eq-name" className="field" required autoComplete="name" value={form.name} onChange={set("name")} placeholder="Your name" />
        </div>
        <div>
          <label className="field-label" htmlFor="eq-phone">Phone number *</label>
          <input id="eq-phone" className="field" required type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={set("phone")} placeholder="+91" />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="eq-trip">Where would you like to go?</label>
          <select id="eq-trip" className="field" value={form.trip} onChange={set("trip")}>
            <option value="">Not sure yet — suggest something</option>
            {packages.map((p) => (
              <option key={p.slug} value={p.title}>
                {p.title}
              </option>
            ))}
            <option value="Custom / other destination">Custom / other destination</option>
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="eq-travellers">Travellers</label>
          <input id="eq-travellers" className="field" inputMode="numeric" value={form.travellers} onChange={set("travellers")} placeholder="e.g. 2 adults, 1 child" />
        </div>
        <div>
          <label className="field-label" htmlFor="eq-month">Travel month</label>
          <input id="eq-month" className="field" value={form.month} onChange={set("month")} placeholder="e.g. December" />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="eq-message">Anything else?</label>
          <textarea id="eq-message" className="field min-h-28 resize-y" value={form.message} onChange={set("message")} placeholder="Budget, hotel preference, special occasions…" />
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3">
        <button type="submit" className="btn btn-gold">
          <WhatsAppIcon className="h-4 w-4" />
          Send on WhatsApp
        </button>
        <a href={mailHref} className="btn btn-outline">
          Send by email
        </a>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted">
        Your details are used only to respond to this enquiry. See our{" "}
        <Link href="/privacy-policy/" className="underline underline-offset-4">privacy policy</Link>.
      </p>
    </form>
  );
}
