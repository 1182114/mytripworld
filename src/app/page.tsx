 
import Link from "next/link";
import { CityLinks } from "@/components/CityLinks";
import { CtaBand } from "@/components/CtaBand";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Faq } from "@/components/Faq";
import { HeroSearch } from "@/components/HeroSearch";
import { ArrowIcon, CarIcon, GlobeIcon, PlaneIcon, ShieldIcon, TrophyIcon, UsersIcon } from "@/components/icons";
import { PackageCard } from "@/components/PackageCard";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Testimonials } from "@/components/Testimonials";
import { TravellerPhoto } from "@/components/TravellerPhoto";
import { UspStrip } from "@/components/UspStrip";
import { faqs } from "@/lib/faq";
import { customerPhotos } from "@/lib/images";
import { packages } from "@/lib/packages";
import { site } from "@/lib/site";

const featured = packages.filter((p) => p.price);

const stats = [
  { icon: TrophyIcon, value: "12+", label: "Years Experience", note: "In creating happy travellers" },
  { icon: GlobeIcon, value: "5", label: "Countries, One Trip", note: "Our best-selling circuit" },
  { icon: UsersIcon, value: "3", label: "Ways to Travel", note: "Group, individual & corporate" },
];

const promises = [
  { icon: CarIcon, title: "Doorstep Transfers", text: "Complimentary home-city to airport pick-up and drop." },
  { icon: PlaneIcon, title: "All-in-one Price", text: "Flights, hotels, transfers and sightseeing bundled." },
  { icon: UsersIcon, title: "Every Kind of Trip", text: "Group departures, private holidays and corporate tours." },
  { icon: ShieldIcon, title: "On-trip Support", text: "A team that stays connected throughout your journey." },
];

const destinations = [
  { name: "Singapore", photo: "merlion", span: "md:col-span-2 md:row-span-2", q: "Singapore" },
  { name: "Thailand", photo: "thailand", span: "", q: "Thailand" },
  { name: "Vietnam", photo: "halong", span: "", q: "Vietnam" },
  { name: "Malaysia", photo: "petronas", span: "", q: "Malaysia" },
  { name: "Bali", photo: "baliTemple", span: "", q: "Bali" },
  { name: "Australia", photo: "sydney", span: "md:col-span-2", q: "Australia" },
  { name: "Dubai", photo: "dubai", span: "", q: "Dubai" },
  { name: "Maldives", photo: "maldives", span: "", q: "Maldives" },
] as const;

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate z-10 bg-ink-soft">
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <picture className="contents">
            <source type="image/webp" srcSet="/hero-900.webp 900w, /hero.webp 1672w" sizes="100vw" />
            <img
              src="/hero.jpg"
              srcSet="/hero-900.jpg 900w, /hero.jpg 1672w"
              sizes="100vw"
              alt="Yacht anchored in a turquoise tropical lagoon beneath limestone cliffs at sunset — international tour packages by My Trip World"
              width={1672}
              height={941}
              fetchPriority="high"
              className="hero-zoom h-full w-full object-cover object-[38%_center] lg:object-center"
            />
          </picture>
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/30 via-transparent to-white/10" />

        <div className="container-x pb-10 pt-24 md:pb-14 md:pt-32 lg:flex lg:min-h-[min(100svh,52rem)] lg:items-center">
          <div className="glass max-w-[50rem] p-5 sm:p-7 md:p-9">
            <p className="eyebrow flex items-center gap-3">
              <span className="h-0.5 w-8 bg-gold" />
              Your trusted travel partner for 12+ years
            </p>
            <h1 className="mt-3 font-display text-[2.3rem] !font-bold leading-[1.08] text-ink-soft md:text-[3.5rem] md:leading-[1.06]">
              International{" "}
              <span className="relative whitespace-nowrap">
                Tour Packages
                <span className="absolute inset-x-0 bottom-0.5 -z-10 h-2.5 rounded-full bg-gold/80 md:h-3" />
              </span>{" "}
              from India
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink md:text-[1.0625rem]">
              We take travellers from India across the world, and welcome guests from abroad to India — group,
              individual and corporate tours with flights, stays and sightseeing included.
            </p>

            <HeroSearch />

            <UspStrip variant="glass" className="mt-6" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-ink/10 bg-white">
        <dl className="container-x grid grid-cols-3 divide-x divide-ink/10 py-6 md:py-7">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 px-2 text-center md:flex-row md:justify-center md:gap-4 md:text-left">
              <s.icon className="hidden h-8 w-8 shrink-0 text-gold md:block" />
              <dt className="font-display text-[2rem] !font-bold leading-none text-ink-soft md:text-[2.6rem]">{s.value}</dt>
              <dd className="leading-tight">
                <span className="block text-[0.8rem] font-bold text-ink md:text-[0.9rem]">{s.label}</span>
                <span className="hidden text-[0.75rem] text-muted md:block">{s.note}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Featured packages */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="eyebrow">Tour packages</p>
              <h2 className="mt-2 font-display text-[2.5rem] leading-[1.05] text-ink md:text-[3.4rem]">
                Our Most Popular &amp; Best Selling Tour Packages
              </h2>
              <span className="gold-rule mt-4" />
            </Reveal>
            <div className="flex items-center gap-6">
              <p className="max-w-md text-[0.95rem] leading-relaxed text-muted">
                International flights, stay, airport pick-up and drop, and sightseeing — all included in one offer price.
              </p>
              <Link href="/tour-packages/" aria-label="View all tour packages" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-white">
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((pkg, i) => (
              <Reveal key={pkg.slug} delay={i * 120}>
                <PackageCard pkg={pkg} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="border-y border-ink/10 bg-white py-14 md:py-16">
        <div className="container-x">
          <Reveal>
            <h2 className="font-display text-[2.1rem] leading-tight text-ink md:text-[2.5rem]">Why Choose My Trip World</h2>
            <span className="gold-rule mt-3" />
          </Reveal>
          <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/20 text-ink-soft ring-1 ring-gold/40">
                    <item.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-[0.95rem] font-extrabold text-ink">{item.title}</h3>
                    <p className="mt-1 text-[0.85rem] leading-relaxed text-muted">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Where we take you" title="Popular Destinations" center>
              From South-East Asia&rsquo;s skylines and beaches to the far side of the Pacific.
            </SectionHeading>
          </Reveal>
          <div className="mt-12 grid auto-rows-[11rem] grid-cols-2 gap-3 md:auto-rows-[14rem] md:grid-cols-4 md:gap-4">
            {destinations.map((d, i) => (
              <Reveal key={d.name} delay={(i % 4) * 80} className={d.span}>
                <Link href={`/tour-packages/?q=${d.q}`} className="group relative block h-full overflow-hidden rounded-3xl">
                  <Photo
                    name={d.photo}
                    alt={`${d.name} tour packages from India`}
                    sizes="(min-width: 768px) 50vw, 50vw"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />
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

      {/* About the packages: descriptive copy for search */}
      <section className="bg-sand-deep py-16 md:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Planned in Haryana, travelled worldwide</p>
            <h2 className="mt-2 font-display text-[2.3rem] leading-[1.08] text-ink md:text-[3rem]">
              International tour packages from India, with every detail arranged
            </h2>
            <span className="gold-rule mt-4" />
            <UspStrip stack className="mt-8 max-w-md" />
          </Reveal>
          <Reveal delay={120} className="prose-seo text-[0.98rem] leading-relaxed text-ink-soft">
            <p>
              My Trip World is a travel company based in Gurugram and Narwana, Haryana. For more than twelve years we
              have planned group tour packages, family holidays and corporate tours for travellers across India, and
              each package combines international flights, hotel stay, airport transfers and sightseeing in one offer
              price.
            </p>
            <p>
              Our most requested trip is the{" "}
              <Link href="/tour-packages/one-trip-5-countries/">Singapore, Malaysia, Thailand, Vietnam and Cambodia tour package</Link>{" "}
              — five countries in 13 nights and 14 days at an offer price of ₹99,999. If you have a week, the{" "}
              <Link href="/tour-packages/one-trip-3-countries/">Singapore Malaysia Thailand tour package</Link> covers
              Singapore, Malaysia and Phuket in 7 nights and 8 days for ₹89,999.
            </p>
            <p>
              For a longer journey, the{" "}
              <Link href="/tour-packages/australia-new-zealand/">Australia New Zealand tour package from India</Link>{" "}
              runs 11 nights and 12 days with all meals and cruising at ₹3,49,999. We also plan{" "}
              <Link href="/tour-packages/explore-vietnam/">Vietnam holidays</Link> and{" "}
              <Link href="/cruise-holidays/">Norwegian Cruise Line sailings</Link>.
            </p>
            <p>
              Travelling in the other direction? We also arrange{" "}
              <Link href="/india-tour-packages/">India tour packages for visitors from abroad</Link>. And wherever you
              start from in India, see how a trip works from your{" "}
              <Link href="/departure-cities/">departure city</Link> or read our <Link href="/#faq">frequently asked questions</Link>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Cruise banner */}
      <section className="container-x py-16 md:py-24">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink px-7 py-16 text-white md:px-16 md:py-24">
            <Photo name="cruiseShip" alt="A cruise ship anchored off a tropical beach" sizes="100vw" className="absolute inset-0 -z-20 h-full w-full object-cover" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/60 to-transparent" />
            <p className="eyebrow !text-gold">Cruise holidays</p>
            <h2 className="mt-2 max-w-xl font-display text-[2.5rem] leading-[1.05] md:text-[3.4rem]">Unpack once. Wake up somewhere new.</h2>
            <p className="mt-5 max-w-md text-white/80">
              Norwegian Cruise Line sailings with cabin, flights and shore excursions arranged as one package.
            </p>
            <Link href="/cruise-holidays/" className="btn btn-gold mt-8">
              Discover cruises
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Customers */}
      <section className="border-t border-ink/10 bg-white py-16 md:py-24">
        <div className="container-x">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionHeading eyebrow="Real travellers" title="Our customers are our brand ambassadors">
                Moments from recent My Trip World departures.
              </SectionHeading>
            </Reveal>
            <Link href="/gallery/" className="btn btn-outline shrink-0 self-start md:self-auto">
              Open the gallery
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {customerPhotos.slice(0, 8).map((p, i) => (
              <Reveal key={p.src} delay={(i % 4) * 80}>
                <figure className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-sand-deep">
                  <TravellerPhoto src={p.src} place={p.place} sizes="(min-width: 768px) 25vw, 50vw" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-3 pt-10 text-xs font-semibold text-white">
                    {p.place}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* FAQ */}
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

      {/* Departure cities */}
      <section className="border-y border-ink/10 bg-white py-16 md:py-20">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Wherever you start" title="Tour Packages from Your City">
              Our travellers come from every major Indian metro. See how your trip works from yours.
            </SectionHeading>
          </Reveal>
          <Reveal delay={100} className="mt-9">
            <CityLinks />
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
                <a href={site.phoneHref} className="underline underline-offset-4">{site.phoneDisplay}</a>
              </li>
              <li>
                <span className="font-bold">Email:</span>{" "}
                <a href={`mailto:${site.email}`} className="underline underline-offset-4">{site.email}</a>
              </li>
              <li>
                <span className="font-bold">Offices:</span> Gurugram &amp; Narwana, Haryana
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
