import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Pic } from "@/components/Pic";
import { Reveal } from "@/components/Reveal";
import { getContent } from "@/lib/content";
import { imgUrl } from "@/lib/img";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { pages, settings, gallery } = await getContent();
  const page = pages.gallery;
  const share = gallery[0]?.image ?? page.heroImage;
  return pageMeta({ title: page.seoTitle, description: page.seoDescription, path: "/gallery/", image: share && imgUrl(share), siteName: settings.name });
}

export default async function GalleryPage() {
  const { pages, gallery } = await getContent();
  const page = pages.gallery;
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.heading} intro={page.intro} image={page.heroImage} crumbs={[{ name: "Gallery", href: "/gallery/" }]} />
      <section className="py-16 md:py-24">
        <div className="container-x columns-2 gap-3 md:columns-3 md:gap-5">
          {gallery.map((g, i) => (
            <Reveal key={g.image.src} delay={(i % 3) * 90} className="mb-3 break-inside-avoid md:mb-5">
              <figure className="group relative overflow-hidden rounded-3xl bg-sand-deep">
                <Pic img={g.image} dimensions sizes="(min-width: 768px) 33vw, 50vw" className="h-auto w-full transition-transform duration-[1200ms] group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-3 pt-10 text-xs font-semibold text-white md:text-sm">{g.place}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
