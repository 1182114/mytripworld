import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TravellerPhoto } from "@/components/TravellerPhoto";
import { customerPhotos } from "@/lib/images";

export const metadata: Metadata = pageMeta({
  title: "Traveller Photo Gallery",
  description:
    "Photos of My Trip World travellers on tour in Malaysia, Singapore, Vietnam, Bali, Kazakhstan and more.",
  path: "/gallery/",
  image: "/gallery/traveller-01.jpg",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Our customers are our brand ambassadors"
        intro="Real moments from real My Trip World departures."
        photo="thailand"
        alt="Longtail boats on a beach in Thailand"
        crumbs={[{ name: "Gallery", href: "/gallery/" }]}
      />
      <section className="py-16 md:py-24">
        <div className="container-x columns-2 gap-3 md:columns-3 md:gap-5">
          {customerPhotos.map((p, i) => (
            <Reveal key={p.src} delay={(i % 3) * 90} className="mb-3 break-inside-avoid md:mb-5">
              <figure className="group relative overflow-hidden rounded-3xl bg-sand-deep">
                <TravellerPhoto src={p.src} place={p.place} sizes="(min-width: 768px) 33vw, 50vw" className="h-auto w-full transition-transform duration-[1200ms] group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-3 pt-10 text-xs font-semibold text-white md:text-sm">
                  {p.place}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
