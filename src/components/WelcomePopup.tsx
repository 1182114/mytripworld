"use client";

import { useEffect, useRef, useState } from "react";

const storageKey = "mtw-welcome-seen";
const quietDays = 7;

type Props = { src: string; srcSet?: string; alt: string; width?: number; height?: number; href: string };

// Home page welcome poster. It appears once the visitor has been on the page a few seconds
// AND has started using it (a scroll, tap or key press), or has scrolled well down. It is shown
// at most once a week per visitor and is rendered in the browser only.
//
// Waiting for that first interaction matters for page speed: browsers stop measuring "largest
// contentful paint" at the first interaction, so the poster is never counted as the page's
// main content. Opened on a timer alone, it was measured as a 7-second page load.
export function WelcomePopup({ src, srcSet, alt, width, height, href }: Props) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    try {
      const seen = Number(localStorage.getItem(storageKey));
      if (seen && Date.now() - seen < quietDays * 86_400_000) return;
    } catch {
      // Storage blocked (private mode): still show it once for this visit.
    }
    const show = () => {
      // Never interrupt someone who is already typing in the search or enquiry form.
      const active = document.activeElement;
      if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement || active instanceof HTMLSelectElement) return;
      stop();
      setOpen(true);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.4) show();
    };
    let waited = false;
    let used = false;
    const maybeShow = () => waited && used && show();
    const onUse = () => {
      used = true;
      maybeShow();
    };
    const useEvents = ["scroll", "pointerdown", "keydown", "touchstart"] as const;
    const timer = window.setTimeout(() => {
      waited = true;
      maybeShow();
    }, 6000);
    const stop = () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      useEvents.forEach((name) => window.removeEventListener(name, onUse));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    useEvents.forEach((name) => window.addEventListener(name, onUse, { passive: true }));
    return stop;
  }, []);

  useEffect(() => {
    if (!open) return;
    dialog.current?.showModal();
    try {
      localStorage.setItem(storageKey, String(Date.now()));
    } catch {}
  }, [open]);

  if (!open) return null;
  const close = () => dialog.current?.close();

  return (
    <dialog
      ref={dialog}
      aria-label={alt}
      onClose={() => setOpen(false)}
      onClick={(e) => e.target === dialog.current && close()}
      className="welcome-popup fixed inset-0 m-auto max-h-[80vh] max-w-[90vw] overflow-visible rounded-3xl bg-transparent p-0 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
    >
      <a href={href} onClick={close} className="block overflow-hidden rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export: the image CDN does the resizing */}
        <img src={src} srcSet={srcSet} sizes="(min-width: 640px) 440px, 90vw" alt={alt} width={width} height={height} decoding="async" className="block h-auto max-h-[80vh] w-auto max-w-[min(90vw,440px)]" />
      </a>
      <button
        type="button"
        onClick={close}
        aria-label="Close"
        className="absolute -right-2 -top-2 flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl leading-none text-ink shadow-lg ring-1 ring-ink/10 transition-colors hover:bg-gold"
      >
        ×
      </button>
    </dialog>
  );
}
