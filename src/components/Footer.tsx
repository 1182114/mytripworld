import Link from "next/link";
import { getContent, whatsappLink } from "@/lib/content";
import { nav } from "@/lib/site";
import { FacebookIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";
import { Pic } from "./Pic";
import { UspStrip } from "./UspStrip";

const heading = "text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-gold";
const link = "transition-colors hover:text-gold";
const round = "flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:bg-gold hover:text-ink";

export async function Footer() {
  const { settings, contact, packages, cities } = await getContent();
  return (
    <footer className="bg-ink text-white/75">
      <div className="h-1 bg-gradient-to-r from-gold via-gold/60 to-transparent" />
      <div className="container-x pt-14 md:pt-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <span className="inline-block rounded-xl bg-white px-4 py-3">
              <Pic img={settings.logo} dimensions sizes="200px" className="h-11 w-auto" />
            </span>
            {settings.footerText && <p className="mt-5 max-w-md text-sm leading-relaxed">{settings.footerText}</p>}
          </div>
          <UspStrip variant="dark" />
        </div>

        <div className="mt-12 grid gap-10 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-[0.8fr_1.2fr_1fr_1.3fr]">
          <nav aria-label="Footer">
            <p className={heading}>Explore</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={link}>{item.label}</Link>
                </li>
              ))}
              <li><Link href="/india-tour-packages/" className={link}>India Tours</Link></li>
              <li><Link href="/reviews/" className={link}>Reviews</Link></li>
              <li><Link href="/#faq" className={link}>FAQ</Link></li>
            </ul>
          </nav>

          <nav aria-label="Tour packages">
            <p className={heading}>Tour packages</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {packages.map((p) => (
                <li key={p.slug}>
                  <Link href={`/tour-packages/${p.slug}/`} className={link}>
                    {p.title}
                    {p.priceLabel && <span className="ml-2 text-white/45">{p.priceLabel}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Departure cities">
            <p className={heading}>Tours from every city</p>
            <ul className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(9.5rem,1fr))] gap-x-4 gap-y-2.5 text-sm">
              {cities
                .filter((c) => c.hasPage)
                .map((c) => (
                  <li key={c.slug}>
                    <Link href={`/${c.slug}/`} className={link}>{c.name}</Link>
                  </li>
                ))}
            </ul>
            <p className="mt-4 text-sm">
              <Link href="/departure-cities/" className="font-bold text-gold hover:underline">We serve all of India →</Link>
            </p>
          </nav>

          <div>
            <p className={heading}>Talk to us</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={contact.phoneHref} className={`flex items-start gap-3 ${link}`}>
                  <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>
                    {contact.phone}
                    {settings.phoneNote && <span className="block text-xs text-white/45">{settings.phoneNote}</span>}
                    {settings.workingHours && <span className="block text-xs text-white/45">{settings.workingHours}</span>}
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className={`flex items-center gap-3 ${link}`}>
                  <MailIcon className="h-4 w-4 shrink-0 text-gold" />
                  {contact.email}
                </a>
              </li>
              {settings.offices.map((office) => (
                <li key={office.city} className="flex items-start gap-3">
                  <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <address className="not-italic leading-relaxed">
                    <span className="font-bold text-white">{office.city}</span>
                    <span className="block text-[0.8rem] text-white/60">
                      {[office.street, office.city, [office.region, office.postalCode].filter(Boolean).join(" ")].filter(Boolean).join(", ")}
                    </span>
                  </address>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3">
              <a href={whatsappLink(contact)} target="_blank" rel="noopener" aria-label="Chat on WhatsApp" className={round}>
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              {settings.social.facebook && (
                <a href={settings.social.facebook} target="_blank" rel="noopener" aria-label={`${settings.name} on Facebook`} className={round}>
                  <FacebookIcon className="h-5 w-5" />
                </a>
              )}
              {(["instagram", "youtube", "googleBusiness", "tripadvisor"] as const).map((k) =>
                settings.social[k] ? (
                  <a key={k} href={settings.social[k]} target="_blank" rel="noopener" className={`${round} w-auto px-3 text-xs font-bold`}>
                    {k === "googleBusiness" ? "Google" : k.charAt(0).toUpperCase() + k.slice(1)}
                  </a>
                ) : null,
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {settings.name}
            {settings.parent && ` · ${settings.parent}`}
          </p>
          <p className="flex flex-wrap gap-x-6 gap-y-2">
            {settings.complaintsEmail && (
              <a href={`mailto:${settings.complaintsEmail}`} className={link}>Complaints: {settings.complaintsEmail}</a>
            )}
            <Link href="/privacy-policy/" className={link}>Privacy Policy</Link>
            <Link href="/terms/" className={link}>Terms &amp; Conditions</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
