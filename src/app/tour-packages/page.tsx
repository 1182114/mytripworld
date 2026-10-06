import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Suspense } from "react";
import { CityLinks } from "@/components/CityLinks";
import { CtaBand } from "@/components/CtaBand";
import { PackageExplorer } from "@/components/PackageExplorer";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = pageMeta({
  title: "Tour Packages & Prices — Holidays from India",
  description:
    "Tour packages from India with prices: Singapore, Malaysia, Thailand, Vietnam, Australia and New Zealand. Flights, stay, transfers and sightseeing included.",
  path: "/tour-packages/",
  image: "/photos/halong.jpg",
});

export default function ToursPage() {
  return (
    <>
      <PageHero
        eyebrow="Tour packages"
        title="International Tour Packages"
        intro="Multi-country circuits and single-destination escapes, each with international flights, hotels, airport transfers and sightseeing included."
        photo="halong"
        alt="Limestone islands rising from Ha Long Bay, Vietnam"
        crumbs={[{ name: "Tour Packages", href: "/tour-packages/" }]}
      />
      <section className="py-14 md:py-20">
        <Suspense>
          <PackageExplorer />
        </Suspense>
      </section>
      <section className="border-t border-ink/10 bg-white py-14 md:py-20">
        <div className="container-x">
          <div className="prose-seo max-w-3xl text-[0.98rem] leading-relaxed text-ink-soft">
            <h2 className="font-display text-[2.2rem] leading-tight text-ink">How our international tour packages work</h2>
            <span className="gold-rule mb-5 mt-3" />
            <p>
              Every My Trip World package is planned as one booking: international flights, hotel stay, airport pick-up
              and drop, and sightseeing. Group tour packages run on fixed itineraries, while individual and corporate
              tours are adjusted to your dates. Final inclusions and price are confirmed in your quote.
            </p>
            <p>
              Not sure where to start? Read the <Link href="/#faq">frequently asked questions</Link>, look at{" "}
              <Link href="/cruise-holidays/">cruise holidays</Link>, or see{" "}
              <Link href="/india-tour-packages/">India tour packages for visitors from abroad</Link>.
            </p>
          </div>
          <h2 className="mt-12 font-display text-[2.2rem] leading-tight text-ink">Tour packages from your city</h2>
          <span className="gold-rule mt-3" />
          <div className="mt-8">
            <CityLinks />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
