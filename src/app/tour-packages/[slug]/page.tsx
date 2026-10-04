import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/EnquiryForm";
import { CheckIcon, WhatsAppIcon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { getPackage, packages } from "@/lib/packages";
import { photoUrl } from "@/lib/images";
import { site, whatsappLink } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tour-packages/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) return {};
  return {
    title: `${pkg.title} — ${pkg.places}`,
    description: pkg.summary,
    alternates: { canonical: `/tour-packages/${pkg.slug}/` },
    openGraph: { title: `${pkg.title} — ${pkg.places}`, description: pkg.summary, images: [photoUrl(pkg.cover)] },
  };
}

export default async function PackagePage({ params }: PageProps<"/tour-packages/[slug]">) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  const url = `${site.url}/tour-packages/${pkg.slug}/`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: pkg.title,
      description: pkg.summary,
      url,
      image: `${site.url}${photoUrl(pkg.cover)}`,
      touristType: ["Group", "Individual", "Corporate"],
      provider: { "@type": "TravelAgency", name: site.name, url: site.url },
      ...(pkg.price && {
        offers: {
          "@type": "Offer",
          price: pkg.price.replace(/[^0-9]/g, ""),
          priceCurrency: "INR",
          url,
          availability: "https://schema.org/InStock",
        },
      }),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "Tour Packages", item: `${site.url}/tour-packages/` },
        { "@type": "ListItem", position: 3, name: pkg.title, item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero eyebrow={pkg.kicker} title={pkg.title} intro={pkg.places} photo={pkg.cover} alt={`${pkg.title}: ${pkg.places}`} />

      <section className="py-16 md:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-[1.25fr_0.9fr]">
          <div>
            <Reveal>
              <div className="flex flex-wrap items-end gap-x-10 gap-y-5 rounded-[1.75rem] bg-ink px-7 py-7 text-white md:px-9">
                {pkg.duration && (
                  <div>
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/60">Duration</p>
                    <p className="mt-1 font-display text-2xl">{pkg.duration}</p>
                  </div>
                )}
                <div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/60">
                    {pkg.price ? "Offer price" : "Pricing"}
                  </p>
                  <p className="mt-1 font-display text-4xl text-gold">
                    {pkg.price ?? "On request"}
                    {pkg.wasPrice && <s className="ml-3 font-sans text-base text-white/50">{pkg.wasPrice}</s>}
                  </p>
                </div>
                <a
                  href={whatsappLink(`Hello My Trip World, please send me details for "${pkg.title}".`)}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-gold ml-auto"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Send query
                </a>
              </div>
            </Reveal>

            <Reveal>
              <h2 className="mt-14 font-display text-4xl text-ink">About this journey</h2>
              <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{pkg.summary}</p>
            </Reveal>

            <Reveal>
              <h2 className="mt-14 font-display text-4xl text-ink">What&rsquo;s included</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl bg-white p-5 text-sm font-semibold text-ink-soft ring-1 ring-ink/5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="mt-14 font-display text-4xl text-ink">Highlights</h2>
              <ol className="mt-6 space-y-0 border-l border-gold/50 pl-7">
                {pkg.highlights.map((h) => (
                  <li key={h.place} className="relative pb-8 last:pb-0">
                    <span className="absolute -left-[2.05rem] top-1.5 h-3 w-3 rounded-full bg-gold ring-4 ring-sand" />
                    <p className="font-display text-2xl text-ink">{h.place}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{h.text}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-xs text-muted">
                Highlights are indicative. Your final day-by-day itinerary, hotels and inclusions are confirmed with your quote.
              </p>
            </Reveal>

            <Reveal>
              <div className="mt-14 grid grid-cols-2 gap-3 md:gap-4">
                {pkg.gallery.map((g, i) => (
                  <Photo
                    key={g}
                    name={g}
                    alt={`${pkg.title} — photo ${i + 1}`}
                    sizes="(min-width: 1024px) 30vw, 50vw"
                    className={`w-full rounded-3xl object-cover ${i % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/5] md:aspect-square"}`}
                  />
                ))}
              </div>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <EnquiryForm defaultTrip={pkg.title} />
            <p className="mt-6 text-center text-sm">
              <Link href="/tour-packages/" className="font-semibold underline underline-offset-4">
                ← All packages
              </Link>
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
