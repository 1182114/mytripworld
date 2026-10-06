import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { EnquiryForm } from "@/components/EnquiryForm";
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Contact Us — Call, WhatsApp or Email",
  description:
    "Call +91 97280-24440, WhatsApp or email My Trip World to plan your international tour or cruise. Offices in Gurugram and Narwana, Haryana.",
  path: "/contact/",
  image: "/photos/wing.jpg",
});

export default function ContactPage() {
  const cards = [
    { icon: PhoneIcon, label: "Call us", value: site.phoneDisplay, note: site.phoneAlt, href: site.phoneHref },
    { icon: WhatsAppIcon, label: "WhatsApp", value: "Chat with our team", note: "Fastest way to get a quote", href: whatsappLink() },
    { icon: MailIcon, label: "Email", value: site.email, note: `Complaints: ${site.complaintsEmail}`, href: `mailto:${site.email}` },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let&rsquo;s plan your next trip"
        intro="Reach out any time — we usually reply the same day."
        photo="wing"
        alt="An aircraft wing above the clouds"
        crumbs={[{ name: "Contact", href: "/contact/" }]}
      />

      <section className="py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="grid gap-4">
              {cards.map((c, i) => (
                <Reveal key={c.label} delay={i * 90}>
                  <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="flex items-start gap-5 rounded-[1.5rem] bg-white p-6 ring-1 ring-ink/5 transition-transform hover:-translate-y-1">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-gold">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="eyebrow block">{c.label}</span>
                      <span className="mt-1 block break-all font-display text-xl text-ink sm:text-2xl">{c.value}</span>
                      <span className="block text-xs text-muted">{c.note}</span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <h2 className="mt-12 font-display text-3xl text-ink">Our offices</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {site.offices.map((o) => (
                  <address key={o.city} className="rounded-[1.5rem] bg-sand-deep p-6 text-sm not-italic leading-relaxed text-ink-soft">
                    <PinIcon className="h-5 w-5 text-gold-deep" />
                    <span className="mt-3 block font-display text-2xl text-ink">{o.city}</span>
                    {o.lines.map((l) => (
                      <span key={l} className="block">{l}</span>
                    ))}
                  </address>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
