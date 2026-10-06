import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getContent, whatsappLink } from "@/lib/content";
import { imgUrl } from "@/lib/img";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { pages, settings } = await getContent();
  const page = pages.contact;
  return pageMeta({ title: page.seoTitle, description: page.seoDescription, path: "/contact/", image: page.heroImage && imgUrl(page.heroImage), siteName: settings.name });
}

export default async function ContactPage() {
  const { pages, settings, contact } = await getContent();
  const page = pages.contact;
  const cards = [
    { icon: PhoneIcon, label: "Call us", value: contact.phone, note: settings.phoneNote, href: contact.phoneHref },
    { icon: WhatsAppIcon, label: "WhatsApp", value: "Chat with our team", note: "Fastest way to get a quote", href: whatsappLink(contact) },
    { icon: MailIcon, label: "Email", value: contact.email, note: settings.complaintsEmail ? `Complaints: ${settings.complaintsEmail}` : undefined, href: `mailto:${contact.email}` },
  ];

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.heading} intro={page.intro} image={page.heroImage} crumbs={[{ name: "Contact", href: "/contact/" }]} />

      <section className="py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="grid gap-4">
              {cards.map((c, i) => (
                <Reveal key={c.label} delay={i * 90}>
                  <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="card card-hover flex items-start gap-5 p-6">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-gold">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="eyebrow block">{c.label}</span>
                      <span className="mt-1 block break-all font-display text-xl text-ink sm:text-2xl">{c.value}</span>
                      {c.note && <span className="block text-xs text-muted">{c.note}</span>}
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <h2 className="mt-12 font-display text-3xl text-ink">Our offices</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {settings.offices.map((o) => (
                  <address key={o.city} className="rounded-[1.5rem] bg-sand-deep p-6 text-sm not-italic leading-relaxed text-ink-soft">
                    <PinIcon className="h-5 w-5 text-gold-deep" />
                    <span className="mt-3 block font-display text-2xl text-ink">{o.city}</span>
                    <span className="block">{o.street}</span>
                    <span className="block">{[o.city, [o.region, o.postalCode].filter(Boolean).join(" ")].filter(Boolean).join(", ")}</span>
                    {o.mapUrl && (
                      <a href={o.mapUrl} target="_blank" rel="noopener" className="mt-2 inline-block font-bold underline decoration-gold decoration-2 underline-offset-4">
                        Open in Google Maps
                      </a>
                    )}
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
