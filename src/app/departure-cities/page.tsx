import type { Metadata } from "next";
import Link from "next/link";
import { AnyCityNote, CityLinks } from "@/components/CityLinks";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { UspStrip } from "@/components/UspStrip";
import { getContent } from "@/lib/content";
import { imgUrl } from "@/lib/img";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { pages, settings } = await getContent();
  const page = pages.departureCities;
  return pageMeta({ title: page.seoTitle, description: page.seoDescription, path: "/departure-cities/", image: page.heroImage && imgUrl(page.heroImage), siteName: settings.name });
}

const h2 = "font-display text-[2.2rem] leading-tight text-ink";

export default async function DepartureCitiesPage() {
  const { pages, cities } = await getContent();
  const page = pages.departureCities;
  const more = cities.filter((c) => c.hasPage && !c.featured);
  const listed = cities.filter((c) => !c.hasPage);
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.heading} intro={page.intro} image={page.heroImage} crumbs={[{ name: "Departure Cities", href: "/departure-cities/" }]} />
      <section className="py-14 md:py-20">
        <div className="container-x">
          <h2 className={h2}>Popular departure cities</h2>
          <span className="gold-rule mt-3" />
          <div className="mt-8">
            <CityLinks scope="featured" />
          </div>

          {more.length > 0 && (
            <>
              <h2 className={`mt-14 ${h2}`}>More cities across India</h2>
              <span className="gold-rule mt-3" />
              <div className="mt-8">
                <CityLinks scope="more" />
              </div>
            </>
          )}

          {listed.length > 0 && (
            <>
              <h2 className={`mt-14 ${h2}`}>We also serve</h2>
              <span className="gold-rule mt-3" />
              <ul className="mt-6 grid gap-x-8 gap-y-2.5 text-[0.95rem] text-ink-soft sm:grid-cols-2 lg:grid-cols-4">
                {listed.map((c) => (
                  <li key={c.slug}>
                    <span className="font-bold text-ink">{c.name}</span>
                    <span className="block text-[0.8rem] text-muted">
                      {c.airport} ({c.code})
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <AnyCityNote className="mt-12" />

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="prose-seo text-[0.98rem] leading-relaxed text-ink-soft">
              {page.bodyHeading && (
                <>
                  <h2 className={h2}>{page.bodyHeading}</h2>
                  <span className="gold-rule mb-5 mt-3" />
                </>
              )}
              {page.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p>
                See all <Link href="/tour-packages/">tour packages and prices</Link>.
              </p>
            </div>
            <div>
              <UspStrip />
              <p className="mt-3 text-xs text-muted">Share your home address when you enquire and our team will confirm the pick-up arrangement for your city.</p>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
