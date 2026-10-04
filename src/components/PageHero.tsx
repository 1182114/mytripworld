import type { PhotoKey } from "@/lib/images";
import { Photo } from "./Photo";

export function PageHero({
  eyebrow,
  title,
  intro,
  photo,
  alt,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  photo?: PhotoKey;
  alt?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      {photo && (
        <Photo name={photo} alt={alt ?? ""} priority className="hero-zoom absolute inset-0 -z-20 h-full w-full object-cover" />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/80 via-ink/45 to-ink/85" />
      <div className="container-x pb-16 pt-36 md:pb-24 md:pt-48">
        <p className="eyebrow !text-gold">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-[2.9rem] leading-[1.02] md:text-7xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">{intro}</p>}
      </div>
    </section>
  );
}
