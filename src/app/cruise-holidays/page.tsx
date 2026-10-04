import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { cruises } from "@/lib/packages";

export const metadata: Metadata = {
  title: "Cruise Holidays",
  description:
    "Cruise holidays from India with My Trip World: Norwegian Cruise Line sailings with cabin, flights, visas and shore excursions arranged as one package.",
  alternates: { canonical: "/cruise-holidays/" },
};

const reasons = [
  { title: "One booking, many destinations", text: "See several countries without repacking a single bag." },
  { title: "Everything on board", text: "Dining, shows, pools and kids' activities are part of the fare." },
  { title: "We handle the paperwork", text: "Flights to the port, visas and transfers are arranged with your cabin." },
];

export default function CruisePage() {
  const cruise = cruises[0];
  return (
    <>
      <PageHero
        eyebrow="Cruise holidays"
        title="Unpack once. Wake up somewhere new."
        intro="Ocean holidays for families, couples and groups — planned end to end by our cruise specialists."
        photo="cruisePort"
        alt="Cruise ships docked at a turquoise island port"
      />

      <section className="py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <Photo name="cruiseShip" alt="A cruise ship anchored off a white-sand beach" sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3] w-full rounded-[2rem] object-cover" />
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading eyebrow={cruise.kicker} title={cruise.title}>
              {cruise.summary}
            </SectionHeading>
            <ul className="mt-8 space-y-3">
              {cruise.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-semibold text-ink-soft">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href={`/tour-packages/${cruise.slug}/`} className="btn btn-ink mt-9">
              View cruise details
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-20 text-white md:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Why cruise" title="A holiday that travels with you" center light />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 110}>
                <div className="h-full rounded-[1.75rem] border border-white/10 bg-white/5 p-8">
                  <p className="font-display text-5xl text-gold">0{i + 1}</p>
                  <h3 className="mt-5 font-display text-3xl">{r.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{r.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading eyebrow="Sail with us" title="Ask for current sailings and cabin prices">
              Cruise fares change by date and cabin type. Tell us when you would like to travel and we will send the best available options.
            </SectionHeading>
          </Reveal>
          <Reveal delay={120}>
            <EnquiryForm defaultTrip={cruise.title} />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
