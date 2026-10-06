import Link from "next/link";
import { cities } from "@/lib/cities";
import { packages } from "@/lib/packages";
import { nav, site, whatsappLink } from "@/lib/site";
import { FacebookIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";
import { UspStrip } from "./UspStrip";

const heading = "text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-gold";
const link = "transition-colors hover:text-gold";

export function Footer() {
  return (
    <footer className="bg-ink text-white/75">
      <div className="h-1 bg-gradient-to-r from-gold via-gold/60 to-transparent" />
      <div className="container-x pt-14 md:pt-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <span className="inline-block rounded-xl bg-white px-4 py-3">
              <picture className="contents">
                <source type="image/webp" srcSet="/logo.webp" />
                { }
                <img src="/logo.png" alt="My Trip World — A Perfect Holiday Maker's" width={800} height={213} loading="lazy" className="h-11 w-auto" />
              </picture>
            </span>
            <p className="mt-5 max-w-md text-sm leading-relaxed">
              International tours for travellers from India, and India tours for guests from abroad — group,
              individual and corporate, planned end to end.
            </p>
          </div>
          <UspStrip variant="dark" />
        </div>

        <div className="mt-12 grid gap-10 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-[0.8fr_1.2fr_1fr_1.3fr]">
          <nav aria-label="Footer">
            <p className={heading}>Explore</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/india-tour-packages/" className={link}>
                  India Tours
                </Link>
              </li>
              <li>
                <Link href="/#faq" className={link}>
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Tour packages">
            <p className={heading}>Tour packages</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {packages.map((p) => (
                <li key={p.slug}>
                  <Link href={`/tour-packages/${p.slug}/`} className={link}>
                    {p.title}
                    {p.price && <span className="ml-2 text-white/45">{p.price}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Departure cities">
            <p className={heading}>Tours from your city</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm lg:grid-cols-1 xl:grid-cols-2">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}/`} className={link}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={heading}>Talk to us</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={site.phoneHref} className={`flex items-start gap-3 ${link}`}>
                  <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>
                    {site.phoneDisplay}
                    <span className="block text-xs text-white/45">{site.phoneAlt}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className={`flex items-center gap-3 ${link}`}>
                  <MailIcon className="h-4 w-4 shrink-0 text-gold" />
                  {site.email}
                </a>
              </li>
              {site.offices.map((office) => (
                <li key={office.city} className="flex items-start gap-3">
                  <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <address className="not-italic leading-relaxed">
                    <span className="font-bold text-white">{office.city}</span>
                    <span className="block text-[0.8rem] text-white/60">{office.lines.join(", ")}</span>
                  </address>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3">
              <a href={whatsappLink()} target="_blank" rel="noopener" aria-label="Chat on WhatsApp" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:bg-gold hover:text-ink">
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a href={site.social.facebook} target="_blank" rel="noopener" aria-label="My Trip World on Facebook" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:bg-gold hover:text-ink">
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} My Trip World · {site.parent}
          </p>
          <p className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={`mailto:${site.complaintsEmail}`} className={link}>
              Complaints: {site.complaintsEmail}
            </a>
            <Link href="/privacy-policy/" className={link}>
              Privacy Policy
            </Link>
            <Link href="/terms/" className={link}>
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
