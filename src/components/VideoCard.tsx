"use client";

import { useState } from "react";
import type { Video } from "@/lib/content/types";

// A YouTube video that costs nothing until it is played: the page shows only YouTube's small
// preview picture, and the real player is loaded when the visitor presses play.
// youtube-nocookie.com is YouTube's privacy mode (no tracking cookies before playback).
export function VideoCard({ video, featured = false }: { video: Video; featured?: boolean }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="group">
      <div className="relative aspect-video overflow-hidden rounded-3xl bg-ink-soft shadow-[0_30px_60px_-38px_rgba(28,39,82,0.9)] ring-1 ring-white/10">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} aria-label={`Play video: ${video.title}`} className="absolute inset-0 h-full w-full cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element -- YouTube's own preview picture, already sized */}
            <img
              src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full scale-[1.02] object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
            <span
              className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-ink shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] ring-8 ring-white/25 transition-transform duration-300 group-hover:scale-110 ${
                featured ? "h-20 w-20" : "h-16 w-16"
              }`}
            >
              <svg viewBox="0 0 24 24" aria-hidden className={`${featured ? "h-8 w-8" : "h-6 w-6"} translate-x-0.5`} fill="currentColor">
                <path d="M8 5.5v13a1 1 0 0 0 1.52.85l10.4-6.5a1 1 0 0 0 0-1.7L9.52 4.65A1 1 0 0 0 8 5.5Z" />
              </svg>
            </span>
            {video.place && (
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-ink">{video.place}</span>
            )}
          </button>
        )}
      </div>
      <figcaption className={`mt-3 font-display leading-snug ${featured ? "text-[1.6rem]" : "text-xl"}`}>{video.title}</figcaption>
    </figure>
  );
}
