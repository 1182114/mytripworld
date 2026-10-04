import type { Metadata } from "next";
import { Suspense } from "react";
import { CtaBand } from "@/components/CtaBand";
import { PackageExplorer } from "@/components/PackageExplorer";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "International Tour Packages",
  description:
    "International tour packages from India: Singapore, Malaysia, Thailand, Vietnam, Cambodia, Australia and New Zealand, with flights, stays and transfers included.",
  alternates: { canonical: "/tour-packages/" },
};

export default function ToursPage() {
  return (
    <>
      <PageHero
        eyebrow="Tour packages"
        title="Explore our packages"
        intro="Multi-country circuits and single-destination escapes, each with international flights, hotels, airport transfers and sightseeing included."
        photo="halong"
        alt="Limestone islands rising from Ha Long Bay, Vietnam"
      />
      <section className="py-14 md:py-20">
        <Suspense>
          <PackageExplorer />
        </Suspense>
      </section>
      <CtaBand />
    </>
  );
}
