import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PackageCard } from "@/components/PackageCard";
import { PageHero } from "@/components/PageHero";
import { UspStrip } from "@/components/UspStrip";
import { getContent } from "@/lib/content";
import { imgUrl } from "@/lib/img";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

// Every destination in the admin panel gets a page listing the packages that include it.
// A destination with no packages and no write-up is kept out of Google until it has content.
export async function generateStaticParams() {
  const { destinations } = await getContent();
  return destinations.map((d) => ({ slug: d.slug }));
}

const matches = (name: string, p: { title: string; placesLabel: string }) => `${p.title} ${p.placesLabel}`.toLowerCase().includes(name.toLowerCase());

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { destinations, packages, settings } = await getContent();
  const d = destinations.find((x) => x.slug === slug);
  if (!d) return {};
  const hasContent = d.intro.length > 0 || packages.some((p) => matches(d.name, p));
  return {
    ...pageMeta({ title: d.seoTitle, description: d.seoDescription, path: `/destinations/${d.slug}/`, image: imgUrl(d.image), siteName: settings.name }),
    robots: hasContent ? undefined : { index: false, follow: true },
  };
}

export default async function DestinationPage({ params }: PageProps<"/destinations/[slug]">) {
  const { slug } = await params;
  const { destinations, packages, settings } = await getContent();
  const d = destinations.find((x) => x.slug === slug);
  if (!d) notFound();
  const matching = packages.filter((p) => matches(d.name, p));

  return (
    <>
      <PageHero
        eyebrow="Destination"
        title={`${d.name} Tour Packages`}
        intro={d.intro[0] ?? `${d.name} holidays from India with flights, stay, airport transfers and sightseeing arranged together.`}
        image={d.image}
        crumbs={[
          { name: "Tour Packages", href: "/tour-packages/" },
          { name: d.name, href: `/destinations/${d.slug}/` },
        ]}
      />
      <section className="py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_0.9fr] lg:gap-14">
          <div>
            <div className="prose-seo text-base leading-relaxed text-ink-soft">
              {d.intro.slice(1).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <UspStrip className="mt-8" />
            <h2 className="mt-10 font-display text-[2.2rem] leading-tight text-ink">{matching.length ? `Packages that include ${d.name}` : `Plan a ${d.name} trip`}</h2>
            <span className="gold-rule mt-3" />
            {matching.length ? (
              <div className="mt-8 grid gap-7 sm:grid-cols-2">
                {matching.map((p) => (
                  <PackageCard key={p.slug} pkg={p} chip={settings.uspChip} />
                ))}
              </div>
            ) : (
              <p className="mt-5 text-[0.95rem] text-muted">
                {d.name} trips are tailor-made. Send us your dates and we will plan it for you, or browse all{" "}
                <Link href="/tour-packages/" className="font-bold underline decoration-gold decoration-2 underline-offset-4">tour packages</Link>.
              </p>
            )}
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <EnquiryForm defaultTrip="Custom / other destination" />
          </aside>
        </div>
      </section>
    </>
  );
}
