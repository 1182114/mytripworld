import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { packages, cities, destinations, legal } = await getContent();
  const lastModified = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });
  return [
    page("/", 1, "weekly"),
    page("/tour-packages/", 0.9, "weekly"),
    ...packages.map((p) => page(`/tour-packages/${p.slug}/`, 0.9, "weekly")),
    page("/cruise-holidays/", 0.8),
    page("/india-tour-packages/", 0.8),
    ...destinations
      .filter((d) => d.intro.length || packages.some((p) => `${p.title} ${p.placesLabel}`.toLowerCase().includes(d.name.toLowerCase())))
      .map((d) => page(`/destinations/${d.slug}/`, 0.7)),
    page("/departure-cities/", 0.7),
    ...cities.filter((c) => c.hasPage).map((c) => page(`/${c.slug}/`, c.featured ? 0.7 : 0.6)),
    page("/about-us/", 0.6),
    page("/gallery/", 0.5),
    page("/reviews/", 0.6),
    page("/contact/", 0.6),
    ...legal.map((l) => page(`/${l.slug}/`, 0.2, "yearly")),
  ];
}
