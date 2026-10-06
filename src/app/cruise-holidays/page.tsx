import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { PackageCard } from "@/components/PackageCard";
import { PageHero } from "@/components/PageHero";
import { Pic } from "@/components/Pic";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { getContent } from "@/lib/content";
import { imgUrl } from "@/lib/img";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { pages, settings } = await getContent();
  const page = pages.cruise;
  return pageMeta({ title: page.seoTitle, description: page.seoDescription, path: "/cruise-holidays/", image: page.heroImage && imgUrl(page.heroImage), siteName: settings.name });
}

export default async function CruisePage() {
  const { pages, packages, settings } = await getContent();
  const page = pages.cruise;
  const cruises = packages.filter((p) => p.kind === "cruise");
  const [first, ...rest] = cruises;
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.heading} intro={page.intro} image={page.heroImage} crumbs={[{ name: "Cruise Holidays", href: "/cruise-holidays/" }]} />

      {first && (
        <section className="py-16 md:py-24">
          <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <Pic img={page.photos[0] ?? first.cover} sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3] w-full rounded-[2rem] object-cover" />
            </Reveal>
            <Reveal delay={120}>
              <SectionHeading eyebrow={first.kicker ?? "Cruise holidays"} title={first.title}>
                {first.summary}
              </SectionHeading>
              <ul className="mt-8 space-y-3">
                {first.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm font-semibold text-ink-soft">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={`/tour-packages/${first.slug}/`} className="btn btn-ink mt-9">
                View cruise details
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          {rest.length > 0 && (
            <div className="container-x mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <PackageCard key={p.slug} pkg={p} chip={settings.uspChip} />
              ))}
            </div>
          )}
        </section>
      )}

      {page.cards.length > 0 && (
        <section className="bg-ink py-16 text-white md:py-24">
          <div className="container-x">
            <Reveal>
              <SectionHeading eyebrow="Why cruise" title={page.cardsHeading ?? "Why cruise"} center light />
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {page.cards.map((r, i) => (
                <Reveal key={r.title} delay={i * 110}>
                  <div className="h-full rounded-[1.75rem] border border-white/10 bg-white/5 p-8">
                    <p className="font-display text-5xl text-gold">0{i + 1}</p>
                    <h3 className="mt-5 font-display text-3xl">{r.title}</h3>
                    {r.text && <p className="mt-3 text-sm leading-relaxed text-white/70">{r.text}</p>}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading eyebrow="Sail with us" title={page.bodyHeading ?? "Ask for current sailings"}>
              {page.body[0]}
            </SectionHeading>
          </Reveal>
          <Reveal delay={120}>
            <EnquiryForm defaultTrip={first?.title} />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
