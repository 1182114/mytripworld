"use client";

import { useEffect, useRef, useState } from "react";

// Counts a figure such as "12+" up from zero the first time it scrolls into view.
// Values that are not numbers (e.g. "Free") are shown as they are.
export function CountUp({ value, className }: { value?: string; className?: string }) {
  const match = /^(\D*)(\d+)(.*)$/.exec(value ?? "");
  const target = match ? Number(match[2]) : 0;
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1100;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          setShown(Math.round(target * (1 - Math.pow(1 - t, 3))));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setShown(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return (
    <span ref={ref} className={className}>
      {match ? `${match[1]}${shown}${match[3]}` : value}
    </span>
  );
}
