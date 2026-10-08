"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/content/link";
import type { Contact, Img } from "@/lib/content/types";
import { nav } from "@/lib/site";
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from "./icons";
import { Pic } from "./Pic";

// Site header: airy and transparent over the hero photo, condensing into a slim
// frosted bar once the page is scrolled.
export function HeaderClient({ contact, logo }: { contact: Contact; logo: Img }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The mobile menu only exists below the desktop breakpoint: close it if the window grows past it,
  // otherwise the page behind would stay locked with no menu on screen.
  useEffect(() => {
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    // While the menu covers the page, keep keyboard and screen-reader focus out of what is behind it.
    const behind = document.querySelectorAll<HTMLElement>("main, footer, .wa-fab, .sticky-cta");
    behind.forEach((el) => (el.inert = open));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      behind.forEach((el) => (el.inert = false));
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, "")));
  const compact = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-ink">
      {/* Soft scrim so the logo and menu stay readable over any photo */}
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/85 via-white/45 to-transparent transition-opacity duration-500 ${compact ? "opacity-0" : "opacity-100"}`} />
      <div
        className={`absolute inset-0 border-b transition-all duration-500 ${
          compact ? "border-ink/10 bg-white/85 shadow-[0_14px_40px_-22px_rgba(28,39,82,0.45)] backdrop-blur-xl backdrop-saturate-150" : "border-transparent bg-transparent"
        }`}
      />

      <div className={`container-x relative flex items-center justify-between gap-4 xl:gap-6 transition-[height] duration-500 ${compact ? "h-[4.25rem]" : "h-[4.75rem] md:h-24"}`}>
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)} aria-label={`${contact.name} — home`}>
          <Pic img={logo} priority dimensions sizes="240px" className={`w-auto transition-[height] duration-500 ${compact ? "h-10 md:h-11" : "h-11 md:h-[3.25rem]"}`} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative whitespace-nowrap px-3 py-2 text-[0.92rem] tracking-[0.01em] transition-colors hover:text-ink-soft ${active ? "font-extrabold text-ink-soft" : "font-semibold text-ink/85"}`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-[3px] origin-left rounded-full bg-gold transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={contact.phoneHref}
            className="group hidden shrink-0 items-center gap-3 whitespace-nowrap rounded-full border border-ink/10 bg-white/70 py-1.5 pl-1.5 pr-5 backdrop-blur transition-colors hover:border-gold hover:bg-white xl:flex"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-soft text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
              <PhoneIcon className="h-4 w-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-[0.66rem] font-bold uppercase tracking-[0.14em] text-muted">Talk to an expert</span>
              <span className="block text-[0.95rem] font-extrabold tracking-tight">{contact.phone}</span>
            </span>
          </a>
          <Link
            href="/contact/"
            className="group hidden shrink-0 items-center gap-3 whitespace-nowrap rounded-full bg-ink-soft py-1.5 pl-6 pr-1.5 text-[0.9rem] font-bold text-white shadow-[0_14px_30px_-14px_rgba(46,61,110,0.9)] transition-all hover:-translate-y-0.5 hover:bg-ink sm:inline-flex"
          >
            Plan My Trip
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-ink transition-transform group-hover:translate-x-0.5">
              <ArrowIcon className="h-4 w-4" />
            </span>
          </Link>
          <button
            type="button"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white/70 backdrop-blur lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`absolute h-[2px] w-5 rounded bg-current transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[6px]"}`} />
            <span className={`absolute h-[2px] w-5 rounded bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute h-[2px] w-5 rounded bg-current transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[6px]"}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full h-[calc(100dvh-4.25rem)] overflow-y-auto bg-white transition-all duration-300 lg:hidden ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <nav className="container-x flex min-h-full flex-col py-6" aria-label="Mobile">
          <ul>
            {nav.map((item, i) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className="flex items-center justify-between border-b border-ink/10 py-4"
                    style={{ transitionDelay: `${i * 30}ms` }}
                  >
                    <span className={`font-display text-[1.7rem] leading-none ${active ? "text-ink-soft" : "text-ink"}`}>{item.label}</span>
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full ${active ? "bg-gold text-ink" : "bg-sand-deep text-ink-soft"}`}>
                      <ArrowIcon className="h-4 w-4" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-auto grid gap-3 pt-8">
            <Link href="/contact/" onClick={() => setOpen(false)} className="btn btn-ink">
              Plan My Trip
              <ArrowIcon className="h-4 w-4" />
            </Link>
            <a href={whatsappLink(contact)} target="_blank" rel="noopener" className="btn btn-gold">
              <WhatsAppIcon className="h-4 w-4" />
              Get a quote on WhatsApp
            </a>
            <a href={contact.phoneHref} className="btn btn-outline">
              <PhoneIcon className="h-4 w-4" />
              Call {contact.phone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
