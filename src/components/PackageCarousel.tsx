import type { Package } from "@/lib/content/types";
import { Carousel } from "./Carousel";
import { PackageCard } from "./PackageCard";

export function PackageCarousel({ packages, chip }: { packages: Package[]; chip?: string }) {
  return (
    <Carousel label="Tour packages">
      {packages.map((pkg) => (
        <PackageCard key={pkg.slug} pkg={pkg} chip={chip} />
      ))}
    </Carousel>
  );
}
