import Link from "next/link";
import { nav, site, whatsappLink } from "@/lib/site";
import { FacebookIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";

export function Footer() {
  return (
    <footer className="bg-ink text-sand/80">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1fr] lg:py-20">
        <div>
          <span className="inline-block rounded-xl bg-white px-4 py-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="My Trip World — A Perfect Holiday Maker's" width={800} height={213} loading="lazy" className="h-11 w-auto" />
          </span>
          <p className="mt-6 max-w-sm text-sm leading-relaxed">
            International tours for travellers from India, and India tours for guests from abroad — group, individual
            and corporate, planned end to end.
          </p>
          <p className="mt-4 text-xs text-sand/50">{site.parent}</p>
        </div>

        <div>
          <p className="eyebrow !text-gold">Explore</p>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow !text-gold">Talk to us</p>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a href={site.phoneHref} className="flex items-start gap-3 hover:text-gold">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  {site.phoneDisplay}
                  <span className="block text-xs text-sand/50">{site.phoneAlt}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener" className="flex items-center gap-3 hover:text-gold">
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-gold" />
                Chat on WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-gold">
                <MailIcon className="h-4 w-4 shrink-0 text-gold" />
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.social.facebook} target="_blank" rel="noopener" className="flex items-center gap-3 hover:text-gold">
                <FacebookIcon className="h-4 w-4 shrink-0 text-gold" />
                Follow us on Facebook
              </a>
            </li>
            <li className="text-xs text-sand/50">
              Complaints:{" "}
              <a href={`mailto:${site.complaintsEmail}`} className="underline underline-offset-4 hover:text-gold">
                {site.complaintsEmail}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow !text-gold">Our offices</p>
          <ul className="mt-5 space-y-5 text-sm">
            {site.offices.map((office) => (
              <li key={office.city} className="flex items-start gap-3">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <address className="not-italic leading-relaxed">
                  <span className="font-semibold text-white">{office.city}</span>
                  {office.lines.map((line) => (
                    <span key={line} className="block text-sand/70">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-sand/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} My Trip World. All rights reserved.</p>
          <p className="flex gap-6">
            <Link href="/privacy-policy/" className="hover:text-gold">
              Privacy Policy
            </Link>
            <Link href="/terms/" className="hover:text-gold">
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
