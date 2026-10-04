/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { EnquiryForm } from "@/components/EnquiryForm";
import { HeroSearch } from "@/components/HeroSearch";
import { ArrowIcon, CarIcon, GlobeIcon, PlaneIcon, ShieldIcon, TrophyIcon, UsersIcon } from "@/components/icons";
import { PackageCard } from "@/components/PackageCard";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Testimonials } from "@/components/Testimonials";
import { customerPhotos } from "@/lib/images";
import { packages } from "@/lib/packages";
import { site } from "@/lib/site";

const featured = packages.filter((p) => p.price);

const stats = [
  { icon: TrophyIcon, value: "12+", label: "Years Experience", note: "In creating happy travellers" },
  { icon: GlobeIcon, value: "5", label: "Countries, One Trip", note: "Our best-selling circuit" },
  { icon: UsersIcon, value: "3", label: "Ways to Travel", note: "Group, individual & corporate" },
  { icon: CarIcon, value: "Free", label: "Airport Transfers", note: "Home-city pick-up & drop" },
];

const promises = [
  { icon: CarIcon, title: "Doorstep Transfers", text: "Complimentary home-city to airport pick-up and drop." },
  { icon: PlaneIcon, title: "All-in-one Price", text: "Flights, hotels, transfers and sightseeing bundled." },
  { icon: UsersIcon, title: "Every Kind of Trip", text: "Group departures, private holidays and corporate tours." },
  { icon: ShieldIcon, title: "On-trip Support", text: "A team that stays connected throughout your journey." },
];

const destinations = [
  { name: "Singapore", photo: "merlion", span: "md:col-span-2 md:row-span-2" },
  { name: "Thailand", photo: "thailand", span: "" },
  { name: "Vietnam", photo: "halong", span: "" },
  { name: "Malaysia", photo: "petronas", span: "" },
  { name: "Bali", photo: "baliTemple", span: "" },
  { name: "Australia", photo: "sydney", span: "md:col-span-2" },
  { name: "Dubai", photo: "dubai", span: "" },
  { name: "Maldives", photo: "maldives", span: "" },
] as const;

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate z-10 bg-sand">
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <img
            src="/hero.jpg"
            srcSet="/hero-900.jpg 900w, /hero.jpg 1672w"
            sizes="100vw"
            alt="Yacht anchored in a turquoise tropical lagoon beneath limestone cliffs at sunset — international tour packages by My Trip World"
            width={1672}
            height={941}
            fetchPriority="high"
            className="hero-zoom h-full w-full object-cover object-[72%_center]"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/90 via-white/75 to-white/45 lg:bg-gradient-to-r lg:from-white/95 lg:via-white/70 lg:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-sand via-sand/85 to-transparent" />

        <div className="container-x pb-8 pt-24 md:pb-10 md:pt-32">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-0.5 w-8 bg-gold" />
            Your trusted travel partner for 12+ years
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-[2.3rem] !font-bold leading-[1.08] text-ink-soft md:text-[3.5rem] md:leading-[1.06]">
            International{" "}
            <span className="relative whitespace-nowrap">
              Tour Packages
              <span className="absolute inset-x-0 bottom-0.5 -z-10 h-2.5 rounded-full bg-gold/80 md:h-3" />
            </span>{" "}
            from India
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink md:text-[1.0625rem]">
            We take travellers from India across the world, and welcome guests from abroad to India — group, individual
            and corporate tours with flights, stays and sightseeing included.
          </p>

          <HeroSearch />

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-4 lg:divide-x lg:divide-ink/15">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5 md:gap-3 lg:px-6 lg:first:pl-0">
                <s.icon className="hidden h-7 w-7 shrink-0 text-gold sm:block" />
                <dt className="text-2xl font-extrabold tracking-tight text-ink md:text-[1.75rem]">{s.value}</dt>
                <dd className="leading-tight">
                  <span className="block text-[0.82rem] font-bold text-ink">{s.label}</span>
                  <span className="hidden text-[0.7rem] text-muted sm:block">{s.note}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Featured packages */}
      <section className="py-16 md:py-20">
        <div className="container-x">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="eyebrow">Tour packages</p>
              <h2 className="mt-2 font-display text-[2.5rem] leading-[1.05] text-ink md:text-[3.4rem]">
                Our Most Popular &amp; Best Selling Tour Packages
              </h2>
              <span className="mt-4 block h-0.5 w-14 rounded bg-gold" />
            </Reveal>
            <div className="flex items-center gap-6">
              <p className="max-w-md text-[0.95rem] leading-relaxed text-muted">
                International flights, stay, airport pick-up and drop, and sightseeing — all included in one offer price.
              </p>
              <Link href="/tour-packages/" aria-label="View all packages" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-white">
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((pkg, i) => (
              <Reveal key={pkg.slug} delay={i * 120}>
                <PackageCard pkg={pkg} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="border-y border-ink/10 bg-white py-12 md:py-14">
        <div className="container-x">
          <h2 className="font-display text-[2.1rem] leading-tight text-ink md:text-[2.5rem]">Why Choose My Trip World</h2>
          <span className="mt-3 block h-0.5 w-14 rounded bg-gold" />
          <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/20 text-ink-soft">
                  <item.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-[0.95rem] font-extrabold text-ink">{item.title}</h3>
                  <p className="mt-1 text-[0.85rem] leading-relaxed text-muted">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Where we take you" title="Popular Destinations" center>
              From South-East Asia&rsquo;s skylines and beaches to the far side of the Pacific.
            </SectionHeading>
          </Reveal>
          <div className="mt-12 grid auto-rows-[11rem] grid-cols-2 gap-3 md:auto-rows-[14rem] md:grid-cols-4 md:gap-4">
            {destinations.map((d, i) => (
              <Reveal key={d.name} delay={(i % 4) * 80} className={d.span}>
                <Link href="/tour-packages/" className="group relative block h-full overflow-hidden rounded-3xl">
                  <Photo
                    name={d.photo}
                    alt={d.name}
                    sizes="(min-width: 768px) 50vw, 50vw"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-transparent" />
                  <p className="absolute bottom-4 left-5 font-display text-2xl text-white md:text-3xl">{d.name}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cruise banner */}
      <section className="container-x">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink px-7 py-16 text-white md:px-16 md:py-24">
            <Photo name="cruiseShip" alt="A cruise ship anchored off a tropical beach" sizes="100vw" className="absolute inset-0 -z-20 h-full w-full object-cover" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/60 to-transparent" />
            <p className="eyebrow !text-gold">Cruise holidays</p>
            <h2 className="mt-2 max-w-xl font-display text-[2.5rem] leading-[1.05] md:text-[3.4rem]">Unpack once. Wake up somewhere new.</h2>
            <p className="mt-5 max-w-md text-white/80">
              Norwegian Cruise Line sailings with cabin, flights, visas and shore excursions arranged as one package.
            </p>
            <Link href="/cruise-holidays/" className="btn btn-gold mt-8">
              Discover cruises
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Customers */}
      <section className="py-20 md:py-28">
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
                  <img src={p.src} alt={`My Trip World travellers in ${p.place}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
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

      {/* Enquiry */}
      <section id="enquire" className="py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading eyebrow="Get in touch" title="Have questions or ready to book?">
              Share your plans and our team will come back with an itinerary and a clear price — usually the same day.
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
