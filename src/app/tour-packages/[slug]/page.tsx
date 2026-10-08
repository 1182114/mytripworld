import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookLink } from "@/components/BookLink";
import { CityLinks } from "@/components/CityLinks";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Faq } from "@/components/Faq";
import { BagIcon, BedIcon, CalendarIcon, CameraIcon, CarIcon, CheckIcon, NamedIcon, PhoneIcon, PlaneIcon, UsersIcon, WhatsAppIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { PackageCard } from "@/components/PackageCard";
import { PageHero } from "@/components/PageHero";
import { Pic } from "@/components/Pic";
import { Reveal } from "@/components/Reveal";
import { StickyCta } from "@/components/StickyCta";
import { UspStrip } from "@/components/UspStrip";
import { getContent, whatsappLink } from "@/lib/content";
import { centralAsiaSlug } from "@/lib/content/central-asia-images";
import { europeCruiseSlug, europeLandSlug } from "@/lib/content/europe-cruise-images";
import { nordicSlug } from "@/lib/content/nordic-images";
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

/** Picks an icon from the wording of an inclusion, so the picture always matches the text. */
function includeIcon(text: string) {
  const t = text.toLowerCase();
  if (/baggage|luggage/.test(t)) return BagIcon;
  if (/flight|airfare|air ticket/.test(t)) return PlaneIcon;
  if (/stay|\bnights?\b|hotel|resort|cabin|room|breakfast|meal/.test(t)) return BedIcon;
  if (/guide|driver/.test(t)) return UsersIcon;
  if (/sightseeing|tour|excursion|ticket|entry|cruis|visit|waterfall|terrace|market|swing/.test(t)) return CameraIcon;
  if (/transfer|pick|drop|transport|train|cab|coach/.test(t)) return CarIcon;
  return CheckIcon;
}
const h2 = "font-display text-[2.2rem] leading-tight text-ink";

function Heading({ children, first }: { children: string; first?: boolean }) {
  return (
    <>
      <h2 className={`${first ? "" : "mt-14 "}${h2}`}>{children}</h2>
      <span className="gold-rule mt-3" />
    </>
  );
}

function Fold({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group overflow-hidden rounded-3xl bg-white ring-1 ring-ink/10">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-4 font-display text-[1.4rem] text-ink transition-colors hover:bg-sand [&::-webkit-details-marker]:hidden">
        {title}
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/25 font-sans text-xl font-bold leading-none text-ink-soft transition-transform group-open:rotate-45">+</span>
      </summary>
      {children}
    </details>
  );
}

function BulletList({ items, tone = "gold" }: { items: string[]; tone?: "gold" | "muted" }) {
  return (
    <ul className="mt-6 grid gap-x-8 gap-y-3 text-[0.95rem] leading-relaxed text-ink-soft sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          {tone === "gold" ? (
            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
              <CheckIcon className="h-3 w-3" />
            </span>
          ) : (
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted" />
          )}
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function PackagePage({ params }: PageProps<"/tour-packages/[slug]">) {
  const { slug } = await params;
  const { packages, contact, settings } = await getContent();
  const pkg = packages.find((p) => p.slug === slug);
  if (!pkg) notFound();

  const url = `${siteUrl}/tour-packages/${pkg.slug}/`;
  const others = packages.filter((p) => p.slug !== pkg.slug).slice(0, 3);
  const route = pkg.itinerary.length ? pkg.itinerary.map((d) => `Day ${d.day}: ${d.title}`) : pkg.stops.length ? pkg.stops.map((s) => s.name) : pkg.highlights.map((h) => h.place);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.seoTitle,
    description: pkg.seoDescription,
    url,
    image: absoluteImg(pkg.cover),
    touristType: ["Group travellers", "Families", "Corporate groups"],
    itinerary: { "@type": "ItemList", itemListElement: route.map((name, i) => ({ "@type": "ListItem", position: i + 1, name })) },
    provider: { "@id": `${siteUrl}/#organization` },
    ...(pkg.price !== undefined && {
      offers: { "@type": "Offer", price: String(pkg.price), priceCurrency: "INR", url, availability: "https://schema.org/InStock", seller: { "@id": `${siteUrl}/#organization` } },
    }),
  };
  const withExperiences = pkg.stops.filter((s) => s.experiences.length > 0);
  const folds = [
    { title: "Not included", items: pkg.excludes },
    { title: "Payment policy", items: pkg.paymentPolicy },
    { title: "Passport & visa", items: pkg.visaInfo },
    { title: "Important information", items: pkg.importantInfo },
    ...pkg.moreInfo,
  ].filter((f) => f.items.length > 0);

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* 1. Hero banner */}
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
        {pkg.tagline && <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-muted">{pkg.tagline}</p>}
        <dl className="mt-6 flex flex-wrap items-end gap-x-9 gap-y-4 border-t border-ink/10 pt-5">
          {pkg.duration && (
            <div>
              <dt className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted">Duration</dt>
              <dd className="mt-0.5 text-lg font-extrabold text-ink">{pkg.duration}</dd>
            </div>
          )}
          {pkg.departureAirports.length > 0 && (
            <div className="max-w-[17rem]">
              <dt className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted">Departing from</dt>
              <dd className={`mt-0.5 font-extrabold text-ink ${pkg.departureAirports.length > 2 ? "text-sm leading-snug" : "text-lg"}`}>{pkg.departureAirports.join(" · ")}</dd>
            </div>
          )}
          <div>
            <dt className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted">{pkg.priceLabel ? "Offer price" : "Pricing"}</dt>
            <dd className="mt-0.5 flex items-baseline gap-3">
              <span className="text-[2.4rem] font-extrabold leading-none tracking-tight text-ink-soft md:text-[2.8rem]">{pkg.priceLabel ?? "On request"}</span>
              {pkg.wasPriceLabel && <s className="text-sm text-muted">{pkg.wasPriceLabel}</s>}
            </dd>
            {pkg.priceTerms && <dd className="mt-1 text-xs font-semibold text-muted">{pkg.priceTerms}</dd>}
          </div>
          <div className="flex flex-wrap gap-3">
            <BookLink contact={contact} title={pkg.title} className="btn btn-gold">
              <WhatsAppIcon className="h-4 w-4" />
              Book Now
            </BookLink>
            <a href="#enquire" className="btn btn-ink">
              Enquire Now
            </a>
          </div>
        </dl>
      </PageHero>

      {/* 2. Package overview */}
      <section className="border-b border-ink/10 bg-white py-14 md:py-16">
        <div className={`container-x grid gap-10 ${pkg.facts.length ? "lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-14" : ""}`}>
          <Reveal>
            <p className="eyebrow">Package overview</p>
            <h2 className={`mt-2 ${h2}`}>About this journey</h2>
            <span className="gold-rule mt-3" />
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted md:text-lg">
              {pkg.overview.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <UspStrip className="mt-7" />
          </Reveal>
          {pkg.facts.length > 0 && (
            <Reveal delay={120}>
              <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {pkg.facts.map((f) => (
                  <div key={f.label} className="card flex flex-col items-start gap-3 p-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/20 text-ink-soft ring-1 ring-gold/40">
                      <NamedIcon name={f.icon} className="h-5 w-5" />
                    </span>
                    <dt className="order-2 text-[0.82rem] font-bold leading-tight text-muted">{f.label}</dt>
                    <dd className="font-display text-[2.6rem] !font-bold leading-none text-ink-soft">{f.value}</dd>
                  </div>
                ))}
                <div className="card flex flex-col justify-center gap-1 bg-ink-soft p-5 text-white" style={{ background: "var(--color-ink-soft)" }}>
                  <dt className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-white/65">{pkg.priceLabel ? "Package price" : "Pricing"}</dt>
                  <dd className="text-[1.75rem] font-extrabold leading-tight tracking-tight text-gold">{pkg.priceLabel ?? "On request"}</dd>
                  {pkg.priceTerms && <dd className="text-[0.72rem] text-white/65">{pkg.priceTerms}</dd>}
                </div>
              </dl>
            </Reveal>
          )}
        </div>
      </section>

      {/* 3. Destination cards */}
      {pkg.stops.length > 0 && (
        <section className="py-14 md:py-20">
          <div className="container-x">
            <Reveal>
              <p className="eyebrow">Where you will go</p>
              <h2 className={`mt-2 ${h2}`}>
                {pkg.stops.length} destinations, one trip
              </h2>
              <span className="gold-rule mt-3" />
            </Reveal>
            <div className={`mt-9 grid gap-5 sm:grid-cols-2 ${pkg.stops.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
              {pkg.stops.map((s, i) => (
                <Reveal key={s.name} delay={(i % 4) * 90}>
                  <article className="group relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-3xl bg-ink-soft p-6 text-white shadow-[0_30px_60px_-40px_rgba(28,39,82,0.8)]">
                    {s.image && <Pic img={s.image} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110" />}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
                    <span className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-gold text-sm font-extrabold text-ink">{i + 1}</span>
                    {s.country && <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-gold">{s.country}</p>}
                    <h3 className="mt-1 font-display text-[2rem] leading-none">{s.name}</h3>
                    {s.nights !== undefined && (
                      <p className="mt-2 text-xs font-bold text-white/80">
                        {s.nights} {s.nights === 1 ? "night" : "nights"}
                      </p>
                    )}
                    {s.summary && <p className="mt-2 text-[0.85rem] leading-snug text-white/85">{s.summary}</p>}
                  </article>
                </Reveal>
              ))}
            </div>
            {pkg.slug === centralAsiaSlug && (
              <p className="mt-5 text-xs text-muted">
                <a className="underline" href="/destinations/central-asia-credits.txt">Photo credits</a>
              </p>
            )}
            {pkg.slug === europeCruiseSlug && (
              <p className="mt-5 text-xs text-muted">
                <a className="underline" href="/destinations/europe-cruise-credits.txt">Photo credits</a>
              </p>
            )}
            {pkg.slug === nordicSlug && (
              <p className="mt-5 text-xs text-muted">
                <a className="underline" href="/destinations/nordic-credits.txt">Photo credits</a>
              </p>
            )}
            {pkg.slug === europeLandSlug && (
              <p className="mt-5 text-xs text-muted">
                <a className="underline" href="/destinations/europe-land-credits.txt">Photo credits</a>
              </p>
            )}
          </div>
        </section>
      )}

      <section className={`pb-28 lg:pb-20 ${pkg.stops.length ? "border-t border-ink/10 bg-white pt-14 md:pt-20" : "pt-14 md:pt-20"}`}>
        <div className="container-x grid gap-12 lg:grid-cols-[1.25fr_0.9fr] lg:gap-14">
          <div>
            {/* 4. Package highlights */}
            {pkg.highlightPoints.length > 0 && (
              <Reveal>
                <Heading first>Package highlights</Heading>
                <BulletList items={pkg.highlightPoints} />
              </Reveal>
            )}

            {pkg.departures.length > 0 && (
              <Reveal>
                <Heading first={!pkg.highlightPoints.length}>Departure dates</Heading>
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

            {/* 5. Inclusions */}
            {pkg.includes.length > 0 && (
              <Reveal>
                <Heading first={!pkg.highlightPoints.length && !pkg.departures.length}>What&rsquo;s included</Heading>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {pkg.includes.map((item) => {
                    const Icon = includeIcon(item);
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

            {/* 6. Destination-wise experiences */}
            {withExperiences.length > 0 && (
              <Reveal>
                <Heading>Experiences, destination by destination</Heading>
                <div className="mt-7 space-y-5">
                  {withExperiences.map((s) => (
                    <article key={s.name} className="card overflow-hidden sm:flex">
                      {s.image && (
                        <div className="relative aspect-[16/9] shrink-0 overflow-hidden bg-ink-soft sm:aspect-auto sm:w-52">
                          <Pic img={s.image} sizes="(min-width: 640px) 208px, 100vw" className="h-full w-full object-cover" />
                        </div>
                      )}
                      <div className="p-5 md:p-6">
                        {s.country && <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-gold-deep">{s.country}</p>}
                        <h3 className="font-display text-[1.7rem] leading-tight text-ink">{s.name}</h3>
                        <ul className="mt-3 space-y-2 text-[0.92rem] leading-relaxed text-ink-soft">
                          {s.experiences.map((e) => (
                            <li key={e} className="flex items-start gap-2.5">
                              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                                <CheckIcon className="h-2.5 w-2.5" />
                              </span>
                              {e}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  ))}
                </div>
              </Reveal>
            )}

            {pkg.itinerary.length > 0 ? (
              <Reveal>
                <Heading>{pkg.itineraryHeading ?? "Day-by-day itinerary"}</Heading>
                <ol className="mt-7 border-l-2 border-gold/50 pl-7">
                  {pkg.itinerary.map((d) => (
                    <li key={d.day} className="relative pb-7 last:pb-0">
                      <span className="absolute -left-[2.1rem] top-1.5 h-3.5 w-3.5 rounded-full bg-gold ring-4 ring-white" />
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
              pkg.stops.length === 0 &&
              pkg.highlights.length > 0 && (
                <Reveal>
                  <Heading>Highlights</Heading>
                  <ol className="mt-7 border-l-2 border-gold/50 pl-7">
                    {pkg.highlights.map((h) => (
                      <li key={h.place} className="relative pb-7 last:pb-0">
                        <span className="absolute -left-[2.1rem] top-1.5 h-3.5 w-3.5 rounded-full bg-gold ring-4 ring-sand" />
                        <h3 className="font-display text-2xl text-ink">{h.place}</h3>
                        <p className="mt-1 text-[0.92rem] leading-relaxed text-muted">{h.text}</p>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-6 text-xs text-muted">Highlights are indicative. Your final day-by-day itinerary, hotels and inclusions are confirmed with your quote.</p>
                </Reveal>
              )
            )}

            {pkg.addOns && (
              <Reveal>
                <div className="mt-14 rounded-3xl bg-sand p-6 ring-1 ring-ink/5 md:flex md:items-center md:justify-between md:gap-8 md:p-7">
                  <div>
                    <h2 className="font-display text-2xl text-ink">Want to add more experiences?</h2>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{pkg.addOns}</p>
                  </div>
                  <a href={whatsappLink(contact, `Hello ${contact.name}, I would like to know about extra activities for "${pkg.title}".`)} target="_blank" rel="noopener" className="btn btn-ink mt-5 shrink-0 md:mt-0">
                    Ask About Activities
                  </a>
                </div>
              </Reveal>
            )}

            {/* 7–10. Exclusions, payment, passport and other details, folded away to keep the page short */}
            {(folds.length > 0 || pkg.terms.length > 0) && (
              <Reveal>
                <Heading>Good to know</Heading>
                <div className="mt-6 space-y-3">
                  {folds.map((f) => (
                    <Fold key={f.title} title={f.title}>
                      <ul className="space-y-3 px-6 pb-6 text-[0.92rem] leading-relaxed text-ink-soft">
                        {f.items.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Fold>
                  ))}
                  {pkg.terms.length > 0 && (
                    <Fold title="Terms & Conditions">
                      <ol className="list-decimal space-y-3 px-6 pb-6 pl-10 text-[0.9rem] leading-relaxed text-muted marker:font-bold marker:text-ink-soft">
                        {pkg.terms.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ol>
                    </Fold>
                  )}
                </div>
              </Reveal>
            )}

            {pkg.gallery.length > 0 && (
              <Reveal>
                <div className="mt-14 grid grid-cols-2 gap-3 md:gap-4">
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
                <Heading>Questions about this trip</Heading>
                <div className="mt-6">
                  <Faq items={pkg.faqs} />
                </div>
              </Reveal>
            )}
          </div>

          {/* 11. Booking */}
          <aside id="enquire" className="scroll-mt-28 lg:sticky lg:top-28 lg:self-start">
            <EnquiryForm defaultTrip={pkg.title} />
            <p className="mt-5 text-center text-sm">
              Questions first? Read the <Link href="/#faq" className="font-bold underline decoration-gold decoration-2 underline-offset-4">FAQ</Link>.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-t border-ink/10 py-14 pb-28 md:py-20 lg:pb-28">
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
          {/* 12. Closing booking box */}
          <Reveal>
            <div className={`${others.length ? "mt-14 " : ""}overflow-hidden rounded-3xl bg-ink-soft p-7 text-white md:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10`} style={{ background: "var(--color-ink-soft)" }}>
              <div className="max-w-xl">
                <h2 className="font-display text-[2rem] leading-tight md:text-[2.4rem]">{pkg.ctaHeading ?? "Ready to book this trip?"}</h2>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-white/75">{pkg.ctaText ?? `Book ${pkg.title} with ${settings.name}.`}</p>
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] font-bold">
                  {settings.phones.map((p) => (
                    <li key={p.href}>
                      <a href={p.href} className="inline-flex items-center gap-2 underline-offset-4 hover:underline">
                        <PhoneIcon className="h-4 w-4 text-gold" />
                        {p.label}
                      </a>
                    </li>
                  ))}
                </ul>
                {settings.workingHours && <p className="mt-2 text-xs text-white/65">Office hours: {settings.workingHours}</p>}
              </div>
              <div className="mt-7 flex shrink-0 flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col">
                <BookLink contact={contact} title={pkg.title} className="btn btn-gold">
                  <WhatsAppIcon className="h-4 w-4" />
                  Book This Tour
                </BookLink>
                <a href="#enquire" className="btn btn-ghost">
                  Send Enquiry
                </a>
                <a href={contact.phoneHref} className="btn btn-ghost">
                  <PhoneIcon className="h-4 w-4" />
                  Call Now
                </a>
              </div>
            </div>
          </Reveal>
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
