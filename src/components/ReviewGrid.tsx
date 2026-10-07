"use client";

import { useState } from "react";
import type { Testimonial } from "@/lib/content/types";
import { ReviewCard } from "./ReviewCard";

const STEP = 12;

// The full list on /reviews/. Every review is in the page's HTML; cards beyond
// the first batch are simply hidden until "Show more" is pressed.
export function ReviewGrid({ reviews }: { reviews: Testimonial[] }) {
  const [shown, setShown] = useState(STEP);
  return (
    <>
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {reviews.map((r, i) => (
          <div key={`${r.name}-${i}`} className={`mb-6 break-inside-avoid ${i >= shown ? "hidden" : ""}`}>
            <ReviewCard review={r} />
          </div>
        ))}
      </div>
      {shown < reviews.length && (
        <div className="mt-6 text-center">
          <button type="button" onClick={() => setShown((n) => n + STEP)} className="btn btn-ink">
            Show more reviews ({reviews.length - shown} more)
          </button>
        </div>
      )}
    </>
  );
}
