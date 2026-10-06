import type { Metadata } from "next";
import Link from "next/link";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Faq } from "@/components/Faq";
import { CheckIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { PackageCard } from "@/components/PackageCard";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getContent } from "@/lib/content";
import { imgUrl } from "@/lib/img";
import { pageMeta } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { pages, settings } = await getContent();
  const page = pages.india;
  return pageMeta({ title: page.seoTitle, description: page.seoDescription, path: "/india-tour-packages/", image: page.heroImage && imgUrl(page.heroImage), siteName: settings.name });
}

export default async function IndiaToursPage() {
  const { pages, packages, settings } = await getContent();
  const page = pages.india;
  const inbound = packages.filter((p) => p.kind === "inbound");
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "India tour packages for international visitors",
          serviceType: "Inbound tours to India",
          url: `${siteUrl}/india-tour-packages/`,
          provider: { "@id": `${siteUrl}/#organization` },
          areaServed: { "@type": "Country", name: "India" },
        }}
      />
      <PageHero eyebrow={page.eyebrow} title={page.heading} intro={page.intro} image={page.heroImage} crumbs={[{ name: "India Tours", href: "/india-tour-packages/" }]} />

      <section className="py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_0.9fr] lg:gap-14">
          <Reveal>
            {page.bodyHeading && (
              <>
                <h2 className="font-display text-[2.2rem] leading-tight text-ink">{page.bodyHeading}</h2>
                <span className="gold-rule mt-3" />
              </>
            )}
            <div className="prose-seo mt-5 text-base leading-relaxed text-ink-soft">
              {page.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p>
                To see how we work with travellers going the other way, look at our{" "}
                <Link href="/tour-packages/">international tour packages from India</Link>.
              </p>
            </div>
            {page.bullets.length > 0 && (
              <ul className="mt-7 space-y-3">
                {page.bullets.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[0.95rem] font-semibold text-ink-soft">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            )}

            {inbound.length > 0 && (
              <div className="mt-12 grid gap-7 sm:grid-cols-2">
                {inbound.map((p) => (
                  <PackageCard key={p.slug} pkg={p} chip={settings.uspChip} />
                ))}
              </div>
            )}

            {page.faqs.length > 0 && (
              <>
                <h2 className="mt-12 font-display text-[2.2rem] leading-tight text-ink">Questions about India tours</h2>
                <span className="gold-rule mb-6 mt-3" />
                <Faq items={page.faqs} />
              </>
            )}
          </Reveal>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <EnquiryForm defaultTrip="Custom / other destination" />
          </aside>
        </div>
      </section>
    </>
  );
}
