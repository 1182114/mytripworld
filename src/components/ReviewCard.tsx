"use client";

import { useState } from "react";
import type { Testimonial } from "@/lib/content/types";
import { QuoteIcon, StarIcon } from "./icons";
import { Pic } from "./Pic";

const initials = (name: string) =>
  name
    .replace(/^(Mr|Mrs|Ms|Dr)\.?\s+/i, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const sourceLabel: Record<string, string> = { google: "Google review", facebook: "Facebook review", justdial: "Justdial review", whatsapp: "Sent on WhatsApp" };
const LONG = 230;

// One review. Long reviews are shortened to keep every card the same height,
// with a "Read more" toggle — the full text is always in the page for Google.
export function ReviewCard({ review, fill = false }: { review: Testimonial; fill?: boolean }) {
  const [open, setOpen] = useState(false);
  const long = review.text.length > LONG;
  return (
    <figure className={`flex flex-col rounded-3xl bg-white p-6 text-ink shadow-[0_26px_55px_-38px_rgba(28,39,82,0.7)] ring-1 ring-ink/5 md:p-7 ${fill ? "h-full" : ""}`}>
      <div className="flex items-center justify-between">
        {review.rating ? (
          <span className="flex gap-0.5 text-gold" role="img" aria-label={`${review.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className={`h-4 w-4 ${i < review.rating! ? "" : "text-ink/15"}`} />
            ))}
          </span>
        ) : (
          <span />
        )}
        <QuoteIcon className="h-5 w-7 text-gold" />
      </div>

      <blockquote className={`mt-4 text-[0.95rem] leading-relaxed text-ink-soft ${long && !open ? "line-clamp-5" : ""}`}>{review.text}</blockquote>
      {long && (
        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="mt-2 self-start text-[0.82rem] font-bold text-ink-soft underline decoration-gold decoration-2 underline-offset-4">
          {open ? "Show less" : "Read more"}
        </button>
      )}

      <figcaption className="mt-auto flex items-center gap-3 pt-5">
        {review.photo ? (
          <Pic img={review.photo} sizes="44px" className="h-11 w-11 shrink-0 rounded-full object-cover" />
        ) : (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-soft text-sm font-bold text-white" aria-hidden>
            {initials(review.name)}
          </span>
        )}
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-sm font-extrabold">{review.name}</span>
          <span className="block truncate text-xs text-muted">{[review.trip, review.source && sourceLabel[review.source]].filter(Boolean).join(" · ")}</span>
        </span>
      </figcaption>
    </figure>
  );
}
