import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  alternates: { canonical: "/terms/" },
};

// DRAFT: placeholder wording for layout purposes. The client (or their
// lawyer) must review and approve this text before the site goes live.
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" />
      <section className="py-16 md:py-24">
        <div className="container-x max-w-3xl space-y-8 text-base leading-relaxed text-muted">
          <div>
            <h2 className="font-display text-3xl text-ink">Prices and offers</h2>
            <p className="mt-3">Prices shown are indicative offer prices and are subject to availability, travel dates, currency movements and supplier changes. Your final price is confirmed in writing with your quote.</p>
          </div>
          <div>
            <h2 className="font-display text-3xl text-ink">Bookings and payments</h2>
            <p className="mt-3">A booking is confirmed once the agreed advance is received and acknowledged by My Trip World. Balance payment schedules are shared at the time of booking.</p>
          </div>
          <div>
            <h2 className="font-display text-3xl text-ink">Cancellations</h2>
            <p className="mt-3">Cancellation and refund terms depend on the airline, hotel and cruise partners involved and are shared with every quote.</p>
          </div>
          <div>
            <h2 className="font-display text-3xl text-ink">Travel documents</h2>
            <p className="mt-3">Travellers are responsible for holding valid passports and meeting visa requirements. Our team assists with the process.</p>
          </div>
          <p className="text-sm">
            Questions? Write to <a className="underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
