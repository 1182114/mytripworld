import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CityLinks } from "@/components/CityLinks";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Faq } from "@/components/Faq";
import { BedIcon, CalendarIcon, CameraIcon, CarIcon, CheckIcon, PlaneIcon, WhatsAppIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { PackageCard } from "@/components/PackageCard";
import { PageHero } from "@/components/PageHero";
import { Pic } from "@/components/Pic";
import { Reveal } from "@/components/Reveal";
import { StickyCta } from "@/components/StickyCta";
import { UspStrip } from "@/components/UspStrip";
import { getContent, whatsappLink } from "@/lib/content";
import { absoluteImg, imgUrl } from "@/lib/img";
import { pageMeta } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

export const dynamicParams = false;

export async function generateStaticParams() {
  const { packages } = await getContent();
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tour-packages/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { packages, settings } = await getContent();
  const pkg = packages.find((p) => p.slug === slug);
  if (!pkg) return {};
  return pageMeta({ title: pkg.seoTitle, description: pkg.seoDescription, path: `/tour-packages/${pkg.slug}/`, image: imgUrl(pkg.cover), siteName: settings.name });
}

const includeIcons = [PlaneIcon, BedIcon, CarIcon, CameraIcon];
const h2 = "font-display text-[2.2rem] leading-tight text-ink";

export default async function PackagePage({ params }: PageProps<"/tour-packages/[slug]">) {
  const { slug } = await params;
  const { packages, contact, settings } = await getContent();
  const pkg = packages.find((p) => p.slug === slug);
  if (!pkg) notFound();

  const url = `${siteUrl}/tour-packages/${pkg.slug}/`;
  const others = packages.filter((p) => p.slug !== pkg.slug).slice(0, 3);
  const stops = pkg.itinerary.length ? pkg.itinerary.map((d) => `Day ${d.day}: ${d.title}`) : pkg.highlights.map((h) => h.place);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.seoTitle,
    description: pkg.seoDescription,
    url,
    image: absoluteImg(pkg.cover),
    touristType: ["Group travellers", "Families", "Corporate groups"],
    itinerary: { "@type": "ItemList", itemListElement: stops.map((name, i) => ({ "@type": "ListItem", position: i + 1, name })) },
    provider: { "@id": `${siteUrl}/#organization` },
    ...(pkg.price !== undefined && {
      offers: { "@type": "Offer", price: String(pkg.price), priceCurrency: "INR", url, availability: "https://schema.org/InStock", seller: { "@id": `${siteUrl}/#organization` } },
    }),
  };
  const query = whatsappLink(contact, `Hello ${contact.name}, please send me details for "${pkg.title}".`);

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        eyebrow={pkg.kicker}
        title={pkg.title}
        intro={pkg.placesLabel}
        image={pkg.cover}
        crumbs={[
          { name: "Tour Packages", href: "/tour-packages/" },
          { name: pkg.title, href: `/tour-packages/${pkg.slug}/` },
        ]}
      >
        <dl className="mt-6 flex flex-wrap items-end gap-x-9 gap-y-4 border-t border-ink/10 pt-5">
          {pkg.duration && (
            <div>
              <dt className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted">Duration</dt>
              <dd className="mt-0.5 text-lg font-extrabold text-ink">{pkg.duration}</dd>
            </div>
          )}
          <div>
            <dt className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted">{pkg.priceLabel ? "Offer price" : "Pricing"}</dt>
            <dd className="mt-0.5 flex items-baseline gap-3">
              <span className="text-[2.1rem] font-extrabold leading-none tracking-tight text-ink-soft">{pkg.priceLabel ?? "On request"}</span>
              {pkg.wasPriceLabel && <s className="text-sm text-muted">{pkg.wasPriceLabel}</s>}
            </dd>
            {pkg.priceTerms && <dd className="mt-1 text-xs font-semibold text-muted">{pkg.priceTerms}</dd>}
          </div>
          <a href={query} target="_blank" rel="noopener" className="btn btn-gold hidden sm:inline-flex">
            <WhatsAppIcon className="h-4 w-4" />
            Send query
          </a>
        </dl>
      </PageHero>

      <section className="py-14 pb-28 md:py-20 lg:pb-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.25fr_0.9fr] lg:gap-14">
          <div>
            <Reveal>
              <UspStrip />
            </Reveal>

            <Reveal>
              <h2 className={`mt-12 ${h2}`}>About this journey</h2>
              <span className="gold-rule mt-3" />
              <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{pkg.summary}</p>
            </Reveal>

            {pkg.departures.length > 0 && (
              <Reveal>
                <h2 className={`mt-12 ${h2}`}>Departure dates</h2>
                <span className="gold-rule mt-3" />
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {pkg.departures.map((d) => (
                    <li key={d.date} className="card flex items-center gap-4 p-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/20 text-ink-soft ring-1 ring-gold/40">
                        <CalendarIcon className="h-5 w-5" />
                      </span>
                      <span className="leading-tight">
                        <span className="block text-[0.95rem] font-extrabold text-ink">{d.label}</span>
                        <span className="block text-xs text-muted">
                          {[d.seatsLeft !== undefined ? (d.seatsLeft === 0 ? "Sold out" : `${d.seatsLeft} seats left`) : null, d.note].filter(Boolean).join(" · ")}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {pkg.includes.length > 0 && (
              <Reveal>
                <h2 className={`mt-12 ${h2}`}>What&rsquo;s included</h2>
                <span className="gold-rule mt-3" />
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {pkg.includes.map((item, i) => {
                    const Icon = includeIcons[i] ?? CheckIcon;
                    return (
                      <li key={item} className="card flex items-center gap-4 p-4 text-[0.92rem] font-bold text-ink-soft">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/20 text-ink-soft ring-1 ring-gold/40">
                          <Icon className="h-5 w-5" />
                        </span>
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            )}

            {pkg.excludes.length > 0 && (
              <Reveal>
                <h2 className={`mt-12 ${h2}`}>Not included</h2>
                <span className="gold-rule mt-3" />
                <ul className="mt-6 grid gap-x-8 gap-y-2.5 text-[0.92rem] text-muted sm:grid-cols-2">
                  {pkg.excludes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {pkg.itinerary.length > 0 ? (
              <Reveal>
                <h2 className={`mt-12 ${h2}`}>Day-by-day itinerary</h2>
                <span className="gold-rule mt-3" />
                <ol className="mt-7 border-l-2 border-gold/50 pl-7">
                  {pkg.itinerary.map((d) => (
                    <li key={d.day} className="relative pb-7 last:pb-0">
                      <span className="absolute -left-[2.1rem] top-1.5 h-3.5 w-3.5 rounded-full bg-gold ring-4 ring-sand" />
                      <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-gold-deep">Day {d.day}</p>
                      <h3 className="font-display text-2xl text-ink">{d.title}</h3>
                      {d.description && <p className="mt-1 text-[0.92rem] leading-relaxed text-muted">{d.description}</p>}
                      {(d.overnight || d.hotel) && (
                        <p className="mt-2 text-xs font-semibold text-ink-soft">{[d.overnight && `Overnight: ${d.overnight}`, d.hotel && `Hotel: ${d.hotel}`].filter(Boolean).join(" · ")}</p>
                      )}
                    </li>
                  ))}
                </ol>
              </Reveal>
            ) : (
              pkg.highlights.length > 0 && (
                <Reveal>
                  <h2 className={`mt-12 ${h2}`}>Highlights</h2>
                  <span className="gold-rule mt-3" />
                  <ol className="mt-7 border-l-2 border-gold/50 pl-7">
                    {pkg.highlights.map((h) => (
                      <li key={h.place} className="relative pb-7 last:pb-0">
                        <span className="absolute -left-[2.1rem] top-1.5 h-3.5 w-3.5 rounded-full bg-gold ring-4 ring-sand" />
                        <h3 className="font-display text-2xl text-ink">{h.place}</h3>
                        <p className="mt-1 text-[0.92rem] leading-relaxed text-muted">{h.text}</p>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-6 text-xs text-muted">
                    Highlights are indicative. Your final day-by-day itinerary, hotels and inclusions are confirmed with your quote.
                  </p>
                </Reveal>
              )
            )}

            {pkg.gallery.length > 0 && (
              <Reveal>
                <div className="mt-12 grid grid-cols-2 gap-3 md:gap-4">
                  {pkg.gallery.map((g) => (
                    <div key={g.src} className="group overflow-hidden rounded-3xl">
                      <Pic img={g} sizes="(min-width: 1024px) 30vw, 50vw" className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105 md:aspect-square" />
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {pkg.faqs.length > 0 && (
              <Reveal>
                <h2 className={`mt-12 ${h2}`}>Questions about this trip</h2>
                <span className="gold-rule mb-6 mt-3" />
                <Faq items={pkg.faqs} />
              </Reveal>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <EnquiryForm defaultTrip={pkg.title} />
            <p className="mt-5 text-center text-sm">
              Questions first? Read the <Link href="/#faq" className="font-bold underline decoration-gold decoration-2 underline-offset-4">FAQ</Link>.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-white py-14 pb-28 md:py-20 lg:pb-20">
        <div className="container-x">
          {others.length > 0 && (
            <>
              <h2 className={h2}>More tour packages</h2>
              <span className="gold-rule mt-3" />
              <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((p) => (
                  <PackageCard key={p.slug} pkg={p} chip={settings.uspChip} />
                ))}
              </div>
            </>
          )}
          <h2 className={`mt-14 ${h2}`}>Travelling from your city</h2>
          <span className="gold-rule mt-3" />
          <div className="mt-8">
            <CityLinks compact />
          </div>
        </div>
      </section>

      <StickyCta title={pkg.title} price={pkg.priceLabel} />
    </>
  );
}
