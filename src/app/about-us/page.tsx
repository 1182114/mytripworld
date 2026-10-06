import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CtaBand } from "@/components/CtaBand";
import { CheckIcon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = pageMeta({
  title: "About Us — Travel Company in Gurugram, Haryana",
  description:
    "My Trip World has planned group, individual and corporate tours for 12+ years, from offices in Gurugram and Narwana, Haryana.",
  path: "/about-us/",
  image: "/photos/planning.jpg",
});

const styles = [
  { title: "Group tours", text: "Fixed departures with a tour manager, like-minded company and every detail pre-arranged." },
  { title: "Individual tours", text: "Private holidays for couples and families, shaped around your dates, pace and budget." },
  { title: "Corporate tours", text: "Incentive trips, offsites and conferences abroad, managed from flights to gala dinners." },
];

const points = [
  "12+ years in the tourism industry",
  "Complimentary home-city to airport pick-up and drop",
  "Trusted travel partners across the world",
  "A team with first-hand international experience",
  "Strong management and reliable on-trip support",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Twelve years of creating unforgettable world travel experiences"
        intro="A division of S.C.R Infotech Pvt. Ltd., My Trip World plans international holidays for travellers from India and India tours for visitors from abroad."
        photo="planning"
        alt="A map, camera and notebook laid out while planning a trip"
        crumbs={[{ name: "About Us", href: "/about-us/" }]}
      />

      <section className="py-16 md:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading eyebrow="Our story" title="Holidays planned by people who have been there" />
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted md:text-lg">
              <p>
                My Trip World has successfully completed 12 years in the tourism industry, offering group, individual
                and corporate tours. With strong management and quality service, we have helped thousands of customers
                enjoy international trips.
              </p>
              <p>
                We provide complimentary home-city to airport pick-up and drop services, so your journey is looked
                after from the moment you leave home. Our trusted global travel partners and our team&rsquo;s
                first-hand international experience allow us to deliver smooth planning, reliable support and truly
                memorable holidays for every customer.
              </p>
            </div>
            <ul className="mt-8 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm font-semibold text-ink-soft">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              <Photo name="goldenBridge" alt="The Golden Bridge near Da Nang, Vietnam" sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[3/4] w-full rounded-3xl object-cover" />
              <Photo name="baliRice" alt="Rice terraces in Bali" sizes="(min-width: 1024px) 25vw, 50vw" className="mt-10 aspect-[3/4] w-full rounded-3xl object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand-deep py-16 md:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="How you can travel" title="Three ways to see the world with us" center />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {styles.map((s, i) => (
              <Reveal key={s.title} delay={i * 110}>
                <div className="h-full rounded-[1.75rem] bg-white p-8 ring-1 ring-ink/5">
                  <p className="font-display text-5xl text-gold">0{i + 1}</p>
                  <h3 className="mt-5 font-display text-3xl text-ink">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
