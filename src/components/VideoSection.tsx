import type { Video } from "@/lib/content/types";
import { Reveal } from "./Reveal";
import { VideoCard } from "./VideoCard";

// Dark band of travel videos. One video fills the width; two sit side by side; three or more
// lead with a large video and continue in a grid.
export function VideoSection({ videos, eyebrow = "Watch", heading = "See where we can take you", intro }: { videos: Video[]; eyebrow?: string; heading?: string; intro?: string }) {
  if (!videos.length) return null;
  const [first, ...rest] = videos;
  const lead = videos.length >= 3;
  return (
    <section className="bg-ink py-16 text-white md:py-24">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow !text-gold">{eyebrow}</p>
          <h2 className="mt-2 font-display text-[2.4rem] leading-[1.05] md:text-[3rem]">{heading}</h2>
          <span className="gold-rule mt-4" />
          {intro && <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-white/70">{intro}</p>}
        </Reveal>
        {lead ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <Reveal className="lg:col-span-2">
              <VideoCard video={first} featured />
            </Reveal>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
              {rest.slice(0, 2).map((v, i) => (
                <Reveal key={v.id} delay={(i + 1) * 90}>
                  <VideoCard video={v} />
                </Reveal>
              ))}
            </div>
            {rest.length > 2 && (
              <div className="grid gap-8 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-3">
                {rest.slice(2).map((v, i) => (
                  <Reveal key={v.id} delay={(i % 3) * 90}>
                    <VideoCard video={v} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className={`mt-10 grid gap-8 ${videos.length === 2 ? "md:grid-cols-2" : ""}`}>
            {videos.map((v, i) => (
              <Reveal key={v.id} delay={i * 90}>
                <VideoCard video={v} featured={videos.length === 1} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
