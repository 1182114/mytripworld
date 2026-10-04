"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site, whatsappLink } from "@/lib/site";
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from "./icons";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, "")));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-ink transition-all duration-300 ${
        scrolled || open ? "bg-white/95 shadow-[0_10px_40px_-20px_rgba(28,39,82,0.4)] backdrop-blur" : "bg-white/85 backdrop-blur-md"
      }`}
    >
      <div className="container-x flex h-[4.25rem] items-center justify-between gap-6 md:h-[4.75rem]">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)} aria-label="My Trip World — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="My Trip World — A Perfect Holiday Maker's" width={800} height={213} className="h-10 w-auto md:h-12" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative py-2 text-[0.84rem] transition-colors hover:text-gold-deep ${isActive(item.href) ? "font-bold" : "font-medium"}`}
            >
              {item.label}
              {isActive(item.href) && <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded bg-gold" />}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a href={site.phoneHref} className="hidden items-center gap-3 xl:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/10">
              <PhoneIcon className="h-4 w-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold">{site.phoneDisplay}</span>
              <span className="block text-[0.68rem] text-muted">Talk to our travel expert</span>
            </span>
          </a>
          <Link href="/contact/" className="btn btn-gold hidden !py-3 sm:inline-flex">
            Plan My Trip
            <ArrowIcon className="h-4 w-4" />
          </Link>
          <button
            type="button"
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`h-[2px] w-6 bg-current transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-[2px] w-6 bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`h-[2px] w-6 bg-current transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="h-[calc(100dvh-4.25rem)] overflow-y-auto border-t border-ink/10 bg-white lg:hidden">
          <nav className="container-x flex flex-col py-6" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`border-b border-ink/10 py-4 font-display text-xl ${isActive(item.href) ? "text-gold-deep" : "text-ink"}`}
              >
                {item.label}
              </Link>
            ))}
            <a href={whatsappLink()} target="_blank" rel="noopener" className="btn btn-gold mt-8">
              <WhatsAppIcon className="h-4 w-4" />
              Get a quote on WhatsApp
            </a>
            <a href={site.phoneHref} className="btn btn-outline mt-3">
              Call {site.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
