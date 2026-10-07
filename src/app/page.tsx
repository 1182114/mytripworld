import Link from "next/link";
import { AlsoServed, AnyCityNote, CityLinks } from "@/components/CityLinks";
import { CtaBand } from "@/components/CtaBand";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Faq } from "@/components/Faq";
import { HeroSearch, type SearchDestination } from "@/components/HeroSearch";
import { ArrowIcon, NamedIcon, TagIcon } from "@/components/icons";
import { CountUp } from "@/components/CountUp";
import { PackageCarousel } from "@/components/PackageCarousel";
import { Pic } from "@/components/Pic";
import { Reveal } from "@/components/Reveal";
import { RichText } from "@/components/RichText";
import { SectionHeading } from "@/components/SectionHeading";
import { Testimonials } from "@/components/Testimonials";
import { UspStrip } from "@/components/UspStrip";
import { getContent } from "@/lib/content";

const tileSpan = { normal: "", wide: "md:col-span-2", large: "md:col-span-2 md:row-span-2" } as const;

/** Splits the H1 so the chosen words can carry the yellow underline. */
function splitHeading(heading: string, highlight?: string) {
  const at = highlight ? heading.indexOf(highlight) : -1;
  return at < 0 ? [heading, "", ""] : [heading.slice(0, at), highlight!, heading.slice(at + highlight!.length)];
}

export default async function Home() {
  const { home, settings, contact, packages, destinations, gallery, faqs, offers } = await getContent();
  const featuredList = packages.filter((p) => p.featured);
  // Featured packages lead the carousel; the rest follow so every package is one swipe away.
  const carousel = [...featuredList, ...packages.filter((p) => !p.featured)];
  const tiles = destinations.filter((d) => d.showOnHome);
  const [before, mark, after] = splitHeading(home.heading, home.headingHighlight);

  const count = (term: string) => packages.filter((p) => `${p.title} ${p.placesLabel} ${p.kicker ?? ""} ${p.kind}`.toLowerCase().includes(term.toLowerCase())).length;
  const cruise = packages.find((p) => p.kind === "cruise");
  const searchDestinations: SearchDestination[] = [
    ...tiles.map((d) => ({ name: d.name, image: d.image, count: count(d.name) })),
    ...(cruise ? [{ name: "Cruise", image: cruise.cover, count: count("cruise") }] : []),
  ]
    .filter((d) => d.count > 0)
    .slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate z-10 bg-ink-soft">
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <Pic img={home.heroImage} priority sizes="100vw" className="hero-zoom h-full w-full object-cover object-[62%_center] lg:object-center" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/35 via-transparent to-ink/35" />

        <div className="container-x flex flex-col pb-8 pt-24 md:pb-10 md:pt-32 lg:min-h-[min(100svh,48rem)]">
          {/* Frosted panel: headline, intro and the two signature benefits */}
          <div className="glass hero-in max-w-[55rem] p-6 md:p-8">
            {home.eyebrow && (
              <p className="eyebrow flex items-center gap-3">
                <span className="h-0.5 w-8 bg-gold" />
                {home.eyebrow}
              </p>
            )}
            <h1 className="mt-3 font-display text-[2.3rem] !font-bold leading-[1.06] text-ink-soft md:text-[3.4rem] md:leading-[1.04]">
              {before}
              {mark && <span className="whitespace-nowrap underline decoration-gold decoration-[3px] underline-offset-[0.2em] md:decoration-4">{mark}</span>}
              {mark && after && <br className="hidden md:block" />}
              {after}
            </h1>
            <p className="mt-4 max-w-[44rem] text-[1.0625rem] leading-relaxed text-ink md:text-lg">{home.intro}</p>

            {settings.usps.length > 0 && (
              <div className="mt-6 border-t border-ink/10 pt-5">
                <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-gold-deep">{settings.uspLabel}</p>
                <ul className="mt-3 grid gap-4 sm:grid-cols-2">
                  {settings.usps.map((u) => (
                    <li key={u.title} className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-ink shadow-[0_8px_18px_-8px_rgba(253,185,19,0.9)]">
                        <NamedIcon name={u.icon} className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-[0.95rem] font-extrabold leading-tight text-ink">{u.title}</span>
                        <span className="mt-1 block text-[0.8rem] leading-snug text-ink-soft">{u.text}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="hero-in-late mt-8 max-w-[60rem] lg:mt-auto lg:pt-10">
            <HeroSearch destinations={searchDestinations} />
          </div>
        </div>
      </section>

      {/* Numbers strip */}
      {home.stats.length > 0 && (
        <section className="border-b border-ink/10 bg-white">
          <dl className="container-x grid grid-cols-3 divide-x divide-ink/10 py-6 md:py-7">
            {home.stats.slice(0, 3).map((st) => (
              <div key={st.title} className="flex flex-col items-center gap-1 px-2 text-center md:flex-row md:justify-center md:gap-4 md:text-left">
                <NamedIcon name={st.icon} className="hidden h-8 w-8 shrink-0 text-gold md:block" />
                <dt className="font-display text-[2rem] !font-bold leading-none text-ink-soft md:text-[2.6rem]">
                  <CountUp value={st.value} />
                </dt>
                <dd className="leading-tight">
                  <span className="block text-[0.8rem] font-bold text-ink md:text-[0.9rem]">{st.title}</span>
                  {st.text && <span className="hidden text-[0.75rem] text-muted md:block">{st.text}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Offers (only when the admin panel has an active offer) */}
      {offers.length > 0 && (
        <section className="bg-gold/15 py-6">
          <ul className="container-x grid gap-3 md:grid-cols-2">
            {offers.map((o) => (
              <li key={o.title} className="flex items-start gap-4 rounded-2xl bg-white px-5 py-4 ring-1 ring-gold/60">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                  <TagIcon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.95rem] font-extrabold text-ink">{o.title}</p>
                  <p className="mt-0.5 text-[0.85rem] leading-snug text-muted">{o.text}</p>
                  <p className="mt-1.5 text-xs font-semibold text-ink-soft">
                    Valid till {o.validLabel}
                    {o.packageSlug && (
                      <>
                        {" · "}
                        <Link href={`/tour-packages/${o.packageSlug}/`} className="underline decoration-gold decoration-2 underline-offset-4">
                          {o.packageTitle ?? "View package"}
                        </Link>
                      </>
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Featured packages */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <Reveal>
              {home.packagesEyebrow && <p className="eyebrow">{home.packagesEyebrow}</p>}
              <h2 className="mt-2 font-display text-[2.5rem] leading-[1.05] text-ink md:text-[3.4rem]">{home.packagesHeading}</h2>
              <span className="gold-rule mt-4" />
            </Reveal>
            <div className="flex items-center gap-6">
              {home.packagesIntro && <p className="max-w-md text-[0.95rem] leading-relaxed text-muted">{home.packagesIntro}</p>}
              <Link href="/tour-packages/" aria-label="View all tour packages" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-white">
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <Reveal delay={120} className="mt-8">
            <PackageCarousel packages={carousel} chip={settings.uspChip} />
          </Reveal>
        </div>
      </section>

      {/* Why us */}
      {home.whyPoints.length > 0 && (
        <section className="border-y border-ink/10 bg-white py-14 md:py-16">
          <div className="container-x">
            <Reveal>
              <h2 className="font-display text-[2.1rem] leading-tight text-ink md:text-[2.5rem]">{home.whyHeading}</h2>
              <span className="gold-rule mt-3" />
            </Reveal>
            <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
              {home.whyPoints.map((item, i) => (
                <Reveal key={item.title} delay={i * 90}>
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/20 text-ink-soft ring-1 ring-gold/40">
                      <NamedIcon name={item.icon} className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-[0.95rem] font-extrabold text-ink">{item.title}</h3>
                      {item.text && <p className="mt-1 text-[0.85rem] leading-relaxed text-muted">{item.text}</p>}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Destinations */}
      {tiles.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container-x">
            <Reveal>
              <SectionHeading eyebrow="Where we take you" title="Popular Destinations" center>
                From South-East Asia&rsquo;s skylines and beaches to the far side of the Pacific.
              </SectionHeading>
            </Reveal>
            <div className="mt-12 grid auto-rows-[11rem] grid-cols-2 gap-3 md:auto-rows-[14rem] md:grid-cols-4 md:gap-4">
              {tiles.map((d, i) => (
                <Reveal key={d.slug} delay={(i % 4) * 80} className={tileSpan[d.tileSize]}>
                  <Link href={`/destinations/${d.slug}/`} className="group relative block h-full overflow-hidden rounded-3xl">
                    <Pic img={d.image} sizes="(min-width: 768px) 50vw, 50vw" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent" />
                    <p className="absolute bottom-4 left-5 flex items-center gap-2 font-display text-2xl text-white md:text-3xl">
                      {d.name}
                      <ArrowIcon className="h-4 w-4 -translate-x-1 text-gold opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About the packages: descriptive copy for search */}
      {home.aboutBody.length > 0 && (
        <section className="bg-sand-deep py-16 md:py-24">
          <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              {home.aboutEyebrow && <p className="eyebrow">{home.aboutEyebrow}</p>}
              {home.aboutHeading && <h2 className="mt-2 font-display text-[2.3rem] leading-[1.08] text-ink md:text-[3rem]">{home.aboutHeading}</h2>}
              <span className="gold-rule mt-4" />
              <UspStrip stack className="mt-8 max-w-md" />
            </Reveal>
            <Reveal delay={120} className="prose-seo text-[0.98rem] leading-relaxed text-ink-soft">
              <RichText value={home.aboutBody} />
            </Reveal>
          </div>
        </section>
      )}

      {/* Cruise banner */}
      {home.cruiseHeading && (
        <section className="container-x py-16 md:py-24">
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink px-7 py-16 text-white md:px-16 md:py-24">
              {home.cruiseImage && <Pic img={home.cruiseImage} sizes="100vw" className="absolute inset-0 -z-20 h-full w-full object-cover" />}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/60 to-transparent" />
              {home.cruiseEyebrow && <p className="eyebrow !text-gold">{home.cruiseEyebrow}</p>}
              <h2 className="mt-2 max-w-xl font-display text-[2.5rem] leading-[1.05] md:text-[3.4rem]">{home.cruiseHeading}</h2>
              {home.cruiseText && <p className="mt-5 max-w-md text-white/80">{home.cruiseText}</p>}
              <Link href="/cruise-holidays/" className="btn btn-gold mt-8">
                Discover cruises
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </section>
      )}

      {/* Customers */}
      {gallery.length > 0 && (
        <section className="border-t border-ink/10 bg-white py-16 md:py-24">
          <div className="container-x">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <Reveal>
                <SectionHeading eyebrow="Real travellers" title="Our customers are our brand ambassadors">
                  Moments from recent {settings.name} departures.
                </SectionHeading>
              </Reveal>
              <Link href="/gallery/" className="btn btn-outline shrink-0 self-start md:self-auto">
                Open the gallery
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {gallery.slice(0, 8).map((g, i) => (
                <Reveal key={g.image.src} delay={(i % 4) * 80}>
                  <figure className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-sand-deep">
                    <Pic img={g.image} sizes="(min-width: 768px) 25vw, 50vw" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-3 pt-10 text-xs font-semibold text-white">{g.place}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <Testimonials />

      {/* FAQ */}
      {faqs.length > 0 && (
        <section id="faq" className="scroll-mt-24 py-16 md:py-24">
          <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
            <Reveal>
              <SectionHeading eyebrow="Good to know" title="Frequently Asked Questions">
                Straight answers about our tour packages, what they include and how booking works.
              </SectionHeading>
              <Link href="/contact/" className="btn btn-ink mt-7">
                Ask us something else
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </Reveal>
            <Reveal delay={120}>
              <Faq items={faqs} />
            </Reveal>
          </div>
        </section>
      )}

      {/* Departure cities */}
      <section className="border-y border-ink/10 bg-white py-16 md:py-20">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="All over India" title="Tour Packages from Every City in India">
              We do not serve only a few cities. {settings.name} plans international tours for travellers from anywhere in India — pick your city to see how your trip works.
            </SectionHeading>
          </Reveal>
          <Reveal delay={100} className="mt-9">
            <CityLinks compact />
            <AlsoServed className="mt-6 max-w-3xl" />
            <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center">
              <AnyCityNote className="flex-1" />
              <Link href="/departure-cities/" className="btn btn-outline shrink-0">
                See all cities
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquire" className="scroll-mt-24 bg-sand-deep py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading eyebrow="Get in touch" title="Have questions or ready to book?">
              Share your plans and our team will come back with an itinerary and a clear price.
            </SectionHeading>
            <ul className="mt-8 space-y-3 text-sm text-ink-soft">
              <li>
                <span className="font-bold">Call:</span>{" "}
                <a href={contact.phoneHref} className="underline underline-offset-4">{contact.phone}</a>
              </li>
              <li>
                <span className="font-bold">Email:</span>{" "}
                <a href={`mailto:${contact.email}`} className="underline underline-offset-4">{contact.email}</a>
              </li>
              <li>
                <span className="font-bold">Offices:</span> {settings.offices.map((o) => o.city).join(" & ")}
                {settings.offices[0]?.region ? `, ${settings.offices[0].region}` : ""}
              </li>
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
