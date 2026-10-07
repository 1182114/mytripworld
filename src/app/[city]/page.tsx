import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CityLinks } from "@/components/CityLinks";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Faq } from "@/components/Faq";
import { CheckIcon, PlaneIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { PackageCard } from "@/components/PackageCard";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { UspStrip } from "@/components/UspStrip";
import { cityFaqs, getContent } from "@/lib/content";
import { imgUrl } from "@/lib/img";
import { pageMeta } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

export const dynamicParams = false;

export async function generateStaticParams() {
  const { cities } = await getContent();
  return cities.filter((c) => c.hasPage).map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[city]">): Promise<Metadata> {
  const { city: slug } = await params;
  const { cities, settings, home } = await getContent();
  const city = cities.find((c) => c.slug === slug);
  if (!city) return {};
  return pageMeta({ title: city.seoTitle, description: city.seoDescription, path: `/${city.slug}/`, image: home.ctaImage && imgUrl(home.ctaImage), siteName: settings.name });
}

export default async function CityPage({ params }: PageProps<"/[city]">) {
  const { city: slug } = await params;
  const content = await getContent();
  const { cities, packages, settings, home } = content;
  const city = cities.find((c) => c.slug === slug && c.hasPage);
  if (!city) notFound();

  const faqs = cityFaqs(city, content);
  const url = `${siteUrl}/${city.slug}/`;
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `International tour packages from ${city.name}`,
    serviceType: "International tour packages",
    url,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: { "@type": "City", name: city.name },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tour packages",
      itemListElement: packages
        .filter((p) => p.price !== undefined)
        .map((p) => ({ "@type": "Offer", name: p.seoTitle, url: `${siteUrl}/tour-packages/${p.slug}/`, price: String(p.price), priceCurrency: "INR" })),
    },
  };

  const steps = [
    { title: "Tell us your plan", text: `Share your destination, travel month and number of travellers from ${city.short} by WhatsApp, phone or the form on this page.` },
    { title: "Get your itinerary and price", text: `We send a day-wise plan with flights from ${city.airport} (${city.code}), hotels, transfers and sightseeing, and a clear price.` },
    { title: "Travel with everything arranged", text: "Tickets and vouchers reach you digitally, and our team stays connected through the trip." },
  ];

  return (
    <>
      <JsonLd data={serviceLd} />
      <PageHero
        eyebrow={`Departing ${city.code}`}
        title={`International Tour Packages from ${city.name}`}
        intro={`Group, family and corporate holidays for travellers from ${city.area} — flights from ${city.airport}, stay, transfers and sightseeing in one price.`}
        image={home.ctaImage}
        alt={`International tours from ${city.name}`}
        crumbs={[
          { name: "Departure Cities", href: "/departure-cities/" },
          { name: city.name, href: `/${city.slug}/` },
        ]}
      />

      <section className="py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_0.9fr] lg:gap-14">
          <div>
            <Reveal>
              <h2 className="font-display text-[2.2rem] leading-tight text-ink">Travelling abroad from {city.name}</h2>
              <span className="gold-rule mt-3" />
              <div className="prose-seo mt-5 text-base leading-relaxed text-ink-soft">
                {city.intro.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <ul className="mt-6 space-y-3">
                {city.notes.map((n) => (
                  <li key={n} className="flex items-start gap-3 text-[0.95rem] text-ink-soft">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {n}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-muted">Routes and flight times are approximate and change by season and airline. The exact flights are confirmed in your quote.</p>
            </Reveal>

            <Reveal>
              <UspStrip className="mt-10" />
              <p className="mt-3 text-xs text-muted">
                Share your address in {city.short} when you enquire and our team will confirm the pick-up arrangement for your trip.
              </p>
            </Reveal>

            <Reveal>
              <h2 className="mt-12 font-display text-[2.2rem] leading-tight text-ink">How booking works from {city.short}</h2>
              <span className="gold-rule mt-3" />
              <ol className="mt-7 grid gap-4 sm:grid-cols-3">
                {steps.map((s, i) => (
                  <li key={s.title} className="card p-5">
                    <span className="font-display text-4xl !font-bold text-gold">0{i + 1}</span>
                    <h3 className="mt-2 text-[0.98rem] font-extrabold text-ink">{s.title}</h3>
                    <p className="mt-1.5 text-[0.85rem] leading-relaxed text-muted">{s.text}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="mb-5 flex items-center gap-3 rounded-2xl bg-ink-soft px-5 py-4 text-white">
              <PlaneIcon className="h-6 w-6 shrink-0 text-gold" />
              <p className="text-sm leading-snug">
                <span className="block font-extrabold">{city.airport}</span>
                <span className="text-white/70">Airport code {city.code}</span>
              </p>
            </div>
            <EnquiryForm />
          </aside>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-white py-14 md:py-20">
        <div className="container-x">
          <h2 className="font-display text-[2.2rem] leading-tight text-ink">Tour packages you can book from {city.name}</h2>
          <span className="gold-rule mt-3" />
          <p className="mt-4 max-w-2xl text-[0.95rem] text-muted">
            Offer prices are shown below. The final price for a departure from {city.short} depends on travel dates and
            flights and is confirmed in your quote.
          </p>
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((p) => (
              <PackageCard key={p.slug} pkg={p} chip={settings.uspChip} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
          <div>
            <h2 className="font-display text-[2.2rem] leading-tight text-ink">Questions from {city.short} travellers</h2>
            <span className="gold-rule mt-3" />
            <p className="mt-4 text-[0.95rem] text-muted">
              More answers in our <Link href="/#faq" className="font-bold underline decoration-gold decoration-2 underline-offset-4">main FAQ</Link>.
            </p>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <section className="border-t border-ink/10 bg-sand-deep py-14 md:py-20">
        <div className="container-x">
          <h2 className="font-display text-[2.2rem] leading-tight text-ink">Other departure cities</h2>
          <span className="gold-rule mt-3" />
          <div className="mt-8">
            <CityLinks current={city.slug} compact />
            <p className="mt-6 text-[0.95rem] text-ink-soft">
              We serve travellers from every city in India —{" "}
              <Link href="/departure-cities/" className="font-bold underline decoration-gold decoration-2 underline-offset-4">see all departure cities</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
