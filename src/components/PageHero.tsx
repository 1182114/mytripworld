import type { ReactNode } from "react";
import type { PhotoKey } from "@/lib/images";
import type { Crumb } from "@/lib/seo";
import { Breadcrumbs } from "./Breadcrumbs";
import { Photo } from "./Photo";

// Bright, compact inner-page hero: full photo with a frosted glass panel for the text.
export function PageHero({
  eyebrow,
  title,
  intro,
  photo,
  alt,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  photo?: PhotoKey;
  alt?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className={`relative isolate overflow-hidden ${photo ? "bg-ink-soft" : "bg-sand-deep"}`}>
      {photo && (
        <>
          <Photo name={photo} alt={alt ?? ""} priority className="hero-zoom absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/35 via-transparent to-white/10" />
        </>
      )}
      <div className="container-x pb-10 pt-28 md:pb-14 md:pt-36">
        <div className={photo ? "glass max-w-3xl p-6 md:p-9" : "max-w-3xl"}>
          {crumbs && <Breadcrumbs crumbs={crumbs} />}
          <p className="eyebrow flex items-center gap-3">
            <span className="h-0.5 w-8 bg-gold" />
            {eyebrow}
          </p>
          <h1 className="mt-3 font-display text-[2.2rem] !font-bold leading-[1.08] text-ink-soft md:text-[3.25rem] md:leading-[1.06]">{title}</h1>
          {intro && <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink md:text-[1.0625rem]">{intro}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
