"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Package } from "@/lib/content/types";
import { ArrowIcon } from "./icons";
import { PackageCard } from "./PackageCard";

// Horizontal, swipeable row of package cards. Uses native scrolling with snap
// points (smooth on touch and trackpads), plus arrows, a progress bar and a
// gentle auto-advance that pauses on hover, focus or when off screen.
export function PackageCarousel({ packages, chip }: { packages: Package[]; chip?: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const paused = useRef(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);
    setProgress(max > 0 ? el.scrollLeft / max : 1);
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slide]");
    const amount = card ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0") : el.clientWidth * 0.9;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    let visible = false;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.4 });
    io.observe(el);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = reduce
      ? undefined
      : window.setInterval(() => {
          if (!visible || paused.current || document.hidden) return;
          const max = el.scrollWidth - el.clientWidth;
          if (max <= 0) return;
          if (el.scrollLeft >= max - 4) el.scrollTo({ left: 0, behavior: "smooth" });
          else step(1);
        }, 4500);

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      io.disconnect();
      if (timer) window.clearInterval(timer);
    };
  }, [step, update]);

  const pause = (value: boolean) => () => (paused.current = value);
  const arrow =
    "flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-white text-ink shadow-[0_10px_25px_-15px_rgba(28,39,82,0.6)] transition-all hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-35";

  return (
    <div onMouseEnter={pause(true)} onMouseLeave={pause(false)} onFocusCapture={pause(true)} onBlurCapture={pause(false)} onTouchStart={pause(true)}>
      <div
        ref={track}
        role="region"
        aria-label="Tour packages"
        tabIndex={0}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-10 pt-2 md:-mx-8 md:px-8"
      >
        {packages.map((pkg) => (
          <div key={pkg.slug} data-slide className="w-[84%] shrink-0 snap-start sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
            <PackageCard pkg={pkg} chip={chip} />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-5">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink/10" aria-hidden>
          <div className="h-full origin-left rounded-full bg-gold transition-transform duration-300" style={{ transform: `scaleX(${Math.max(0.12, progress)})` }} />
        </div>
        <div className="flex gap-2.5">
          <button type="button" className={arrow} onClick={() => step(-1)} disabled={atStart} aria-label="Previous packages">
            <ArrowIcon className="h-5 w-5 rotate-180" />
          </button>
          <button type="button" className={arrow} onClick={() => step(1)} disabled={atEnd} aria-label="Next packages">
            <ArrowIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
