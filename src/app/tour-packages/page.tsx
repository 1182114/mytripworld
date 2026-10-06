import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CityLinks } from "@/components/CityLinks";
import { CtaBand } from "@/components/CtaBand";
import { PackageExplorer } from "@/components/PackageExplorer";
import { PageHero } from "@/components/PageHero";
import { getContent } from "@/lib/content";
import { imgUrl } from "@/lib/img";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { pages, settings } = await getContent();
  const page = pages.tourPackages;
  return pageMeta({ title: page.seoTitle, description: page.seoDescription, path: "/tour-packages/", image: page.heroImage && imgUrl(page.heroImage), siteName: settings.name });
}

export default async function ToursPage() {
  const { pages, packages, contact, settings } = await getContent();
  const page = pages.tourPackages;
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.heading} intro={page.intro} image={page.heroImage} crumbs={[{ name: "Tour Packages", href: "/tour-packages/" }]} />
      <section className="py-14 md:py-20">
        <Suspense>
          <PackageExplorer packages={packages} contact={contact} chip={settings.uspChip} />
        </Suspense>
      </section>
      <section className="border-t border-ink/10 bg-white py-14 md:py-20">
        <div className="container-x">
          <div className="prose-seo max-w-3xl text-[0.98rem] leading-relaxed text-ink-soft">
            {page.bodyHeading && (
              <>
                <h2 className="font-display text-[2.2rem] leading-tight text-ink">{page.bodyHeading}</h2>
                <span className="gold-rule mb-5 mt-3" />
              </>
            )}
            {page.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>
              Not sure where to start? Read the <Link href="/#faq">frequently asked questions</Link>, look at{" "}
              <Link href="/cruise-holidays/">cruise holidays</Link>, or see{" "}
              <Link href="/india-tour-packages/">India tour packages for visitors from abroad</Link>.
            </p>
          </div>
          <h2 className="mt-12 font-display text-[2.2rem] leading-tight text-ink">Tour packages from your city</h2>
          <span className="gold-rule mt-3" />
          <div className="mt-8">
            <CityLinks scope="featured" />
            <p className="mt-6 text-[0.95rem] text-ink-soft">
              We serve travellers from every city in India —{" "}
              <Link href="/departure-cities/" className="font-bold underline decoration-gold decoration-2 underline-offset-4">see all departure cities</Link>.
            </p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
