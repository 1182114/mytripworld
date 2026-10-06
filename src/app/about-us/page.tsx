import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { CheckIcon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { Pic } from "@/components/Pic";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { getContent } from "@/lib/content";
import { imgUrl } from "@/lib/img";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { pages, settings } = await getContent();
  const page = pages.about;
  return pageMeta({ title: page.seoTitle, description: page.seoDescription, path: "/about-us/", image: page.heroImage && imgUrl(page.heroImage), siteName: settings.name });
}

export default async function AboutPage() {
  const { pages } = await getContent();
  const page = pages.about;
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.heading} intro={page.intro} image={page.heroImage} crumbs={[{ name: "About Us", href: "/about-us/" }]} />

      <section className="py-16 md:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            {page.bodyHeading && <SectionHeading eyebrow="Our story" title={page.bodyHeading} />}
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted md:text-lg">
              {page.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {page.bullets.length > 0 && (
              <ul className="mt-8 space-y-3">
                {page.bullets.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm font-semibold text-ink-soft">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
          {page.photos.length > 0 && (
            <Reveal delay={120}>
              <div className="grid grid-cols-2 gap-4">
                {page.photos.slice(0, 2).map((img, i) => (
                  <Pic key={img.src} img={img} sizes="(min-width: 1024px) 25vw, 50vw" className={`aspect-[3/4] w-full rounded-3xl object-cover ${i === 1 ? "mt-10" : ""}`} />
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {page.cards.length > 0 && (
        <section className="bg-sand-deep py-16 md:py-24">
          <div className="container-x">
            <Reveal>
              <SectionHeading eyebrow="How you can travel" title={page.cardsHeading ?? "How you can travel"} center />
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {page.cards.map((s, i) => (
                <Reveal key={s.title} delay={i * 110}>
                  <div className="card h-full p-8">
                    <p className="font-display text-5xl text-gold">0{i + 1}</p>
                    <h3 className="mt-5 font-display text-3xl text-ink">{s.title}</h3>
                    {s.text && <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
