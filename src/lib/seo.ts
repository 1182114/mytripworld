import type { Metadata } from "next";
import { siteUrl } from "./site";

// One place to build per-page titles, descriptions, canonicals and share images.
export function pageMeta({
  title,
  description,
  path,
  image = "/hero.jpg",
  siteName,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  siteName: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName, title: `${title} | ${siteName}`, description, url: path, images: [{ url: image }] },
    twitter: { card: "summary_large_image", title: `${title} | ${siteName}`, description, images: [image] },
  };
}

export type Crumb = { name: string; href: string };

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", href: "/" }, ...crumbs].map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${siteUrl}${c.href}` })),
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
