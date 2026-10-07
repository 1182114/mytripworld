import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description: "How My Trip World collects and uses the details you share when you send a travel enquiry.",
  path: "/privacy-policy/",
});

// DRAFT: placeholder wording for layout purposes. The client (or their
// lawyer) must review and approve this text before the site goes live.
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" crumbs={[{ name: "Privacy Policy", href: "/privacy-policy/" }]} />
      <section className="py-16 md:py-24">
        <div className="container-x max-w-3xl space-y-8 text-base leading-relaxed text-muted">
          <div>
            <h2 className="font-display text-3xl text-ink">What we collect</h2>
            <p className="mt-3">When you send an enquiry we receive the details you choose to share: your name, phone number, email address and travel preferences.</p>
          </div>
          <div>
            <h2 className="font-display text-3xl text-ink">How we use it</h2>
            <p className="mt-3">We use these details only to respond to your enquiry, prepare quotes and manage bookings you make with us. We do not sell your information.</p>
          </div>
          <div>
            <h2 className="font-display text-3xl text-ink">Sharing</h2>
            <p className="mt-3">To complete a booking we share the necessary traveller details with airlines, hotels, cruise lines, visa authorities and local partners.</p>
          </div>
          <div>
            <h2 className="font-display text-3xl text-ink">Your choices</h2>
            <p className="mt-3">You may ask us to correct or delete your details at any time by contacting us.</p>
          </div>
          <p className="text-sm">
            Questions? Write to <a className="underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
