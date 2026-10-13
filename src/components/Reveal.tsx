"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// One observer for every Reveal on the page. A block that starts below the screen is hidden
// and fades up when it scrolls in; a block already on screen at load is left alone.
let observer: IntersectionObserver | undefined;
function sharedObserver() {
  return (observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          el.classList.remove("reveal-pending");
          observer?.unobserve(el);
        } else if (entry.rootBounds && entry.boundingClientRect.top >= entry.rootBounds.bottom) {
          el.classList.add("reveal-pending");
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  ));
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = sharedObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}
