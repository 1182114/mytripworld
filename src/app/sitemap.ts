import type { MetadataRoute } from "next";
import { cities } from "@/lib/cities";
import { packages } from "@/lib/packages";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${site.url}${path}`,
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
    page("/departure-cities/", 0.7),
    ...cities.map((c) => page(`/${c.slug}/`, 0.7)),
    page("/about-us/", 0.6),
    page("/gallery/", 0.5),
    page("/contact/", 0.6),
    page("/privacy-policy/", 0.2, "yearly"),
    page("/terms/", 0.2, "yearly"),
  ];
}
