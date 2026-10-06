import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CityLinks } from "@/components/CityLinks";
import { EnquiryForm } from "@/components/EnquiryForm";
import { BedIcon, CameraIcon, CarIcon, CheckIcon, PlaneIcon, WhatsAppIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { PackageCard } from "@/components/PackageCard";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { StickyCta } from "@/components/StickyCta";
import { UspStrip } from "@/components/UspStrip";
import { photoUrl } from "@/lib/images";
import { getPackage, packages } from "@/lib/packages";
import { pageMeta } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tour-packages/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) return {};
  return pageMeta({
    title: pkg.seoTitle,
    description: pkg.seoDescription,
    path: `/tour-packages/${pkg.slug}/`,
    image: photoUrl(pkg.cover),
  });
}

const includeIcons = [PlaneIcon, BedIcon, CarIcon, CameraIcon];

export default async function PackagePage({ params }: PageProps<"/tour-packages/[slug]">) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  const url = `${site.url}/tour-packages/${pkg.slug}/`;
  const others = packages.filter((p) => p.slug !== pkg.slug).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.seoTitle,
    description: pkg.seoDescription,
    url,
    image: `${site.url}${photoUrl(pkg.cover)}`,
    touristType: ["Group travellers", "Families", "Corporate groups"],
    itinerary: {
      "@type": "ItemList",
      itemListElement: pkg.highlights.map((h, i) => ({ "@type": "ListItem", position: i + 1, name: h.place })),
    },
    provider: { "@id": `${site.url}/#organization` },
    ...(pkg.price && {
      offers: {
        "@type": "Offer",
        price: pkg.price.replace(/[^0-9]/g, ""),
        priceCurrency: "INR",
        url,
        availability: "https://schema.org/InStock",
        seller: { "@id": `${site.url}/#organization` },
      },
    }),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        eyebrow={pkg.kicker}
        title={pkg.title}
        intro={pkg.places}
        photo={pkg.cover}
        alt={`${pkg.seoTitle}: ${pkg.places}`}
        crumbs={[
          { name: "Tour Packages", href: "/tour-packages/" },
          { name: pkg.title, href: `/tour-packages/${pkg.slug}/` },
        ]}
      >
        <dl className="mt-6 flex flex-wrap items-end gap-x-9 gap-y-4 border-t border-ink/10 pt-5">
          {pkg.duration && (
            <div>
              <dt className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted">Duration</dt>
              <dd className="mt-0.5 text-lg font-extrabold text-ink">{pkg.duration}</dd>
            </div>
          )}
          <div>
            <dt className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted">{pkg.price ? "Offer price" : "Pricing"}</dt>
            <dd className="mt-0.5 flex items-baseline gap-3">
              <span className="text-[2.1rem] font-extrabold leading-none tracking-tight text-ink-soft">{pkg.price ?? "On request"}</span>
              {pkg.wasPrice && <s className="text-sm text-muted">{pkg.wasPrice}</s>}
            </dd>
          </div>
          <a
            href={whatsappLink(`Hello My Trip World, please send me details for "${pkg.title}".`)}
            target="_blank"
            rel="noopener"
            className="btn btn-gold hidden sm:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Send query
          </a>
        </dl>
      </PageHero>

      <section className="py-14 pb-28 md:py-20 lg:pb-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.25fr_0.9fr] lg:gap-14">
          <div>
            <Reveal>
              <UspStrip />
            </Reveal>

            <Reveal>
              <h2 className="mt-12 font-display text-[2.2rem] leading-tight text-ink">About this journey</h2>
              <span className="gold-rule mt-3" />
              <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{pkg.summary}</p>
            </Reveal>

            <Reveal>
              <h2 className="mt-12 font-display text-[2.2rem] leading-tight text-ink">What&rsquo;s included</h2>
              <span className="gold-rule mt-3" />
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {pkg.includes.map((item, i) => {
                  const Icon = includeIcons[i] ?? CheckIcon;
                  return (
                    <li key={item} className="card flex items-center gap-4 p-4 text-[0.92rem] font-bold text-ink-soft">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/20 text-ink-soft ring-1 ring-gold/40">
                        <Icon className="h-5 w-5" />
                      </span>
                      {item}
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="mt-12 font-display text-[2.2rem] leading-tight text-ink">Highlights</h2>
              <span className="gold-rule mt-3" />
              <ol className="mt-7 border-l-2 border-gold/50 pl-7">
                {pkg.highlights.map((h) => (
                  <li key={h.place} className="relative pb-7 last:pb-0">
                    <span className="absolute -left-[2.1rem] top-1.5 h-3.5 w-3.5 rounded-full bg-gold ring-4 ring-sand" />
                    <h3 className="font-display text-2xl text-ink">{h.place}</h3>
                    <p className="mt-1 text-[0.92rem] leading-relaxed text-muted">{h.text}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-xs text-muted">
                Highlights are indicative. Your final day-by-day itinerary, hotels and inclusions are confirmed with your quote.
              </p>
            </Reveal>

            <Reveal>
              <div className="mt-12 grid grid-cols-2 gap-3 md:gap-4">
                {pkg.gallery.map((g, i) => (
                  <div key={g} className="group overflow-hidden rounded-3xl">
                    <Photo
                      name={g}
                      alt={`${pkg.title} — photo ${i + 1}`}
                      sizes="(min-width: 1024px) 30vw, 50vw"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105 md:aspect-square"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <EnquiryForm defaultTrip={pkg.title} />
            <p className="mt-5 text-center text-sm">
              Questions first? Read the <Link href="/#faq" className="font-bold underline decoration-gold decoration-2 underline-offset-4">FAQ</Link>.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-white py-14 pb-28 md:py-20 lg:pb-20">
        <div className="container-x">
          <h2 className="font-display text-[2.2rem] leading-tight text-ink">More tour packages</h2>
          <span className="gold-rule mt-3" />
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <PackageCard key={p.slug} pkg={p} />
            ))}
          </div>

          <h2 className="mt-14 font-display text-[2.2rem] leading-tight text-ink">Travelling from your city</h2>
          <span className="gold-rule mt-3" />
          <div className="mt-8">
            <CityLinks />
          </div>
        </div>
      </section>

      <StickyCta title={pkg.title} price={pkg.price} />
    </>
  );
}
