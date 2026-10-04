import type { MetadataRoute } from "next";
import { packages } from "@/lib/packages";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/about-us/", "/tour-packages/", "/cruise-holidays/", "/gallery/", "/contact/", "/privacy-policy/", "/terms/"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, priority: p === "/" ? 1 : 0.7 })),
    ...packages.map((p) => ({ url: `${site.url}/tour-packages/${p.slug}/`, priority: 0.8 })),
  ];
}
