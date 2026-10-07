import { getContent, whatsappLink } from "@/lib/content";
import { PhoneIcon, WhatsAppIcon } from "./icons";

// Bottom bar on package pages (phone and desktop) so booking is always one tap away.
export async function StickyCta({ title, price }: { title: string; price?: string }) {
  const { contact } = await getContent();
  return (
    <div className="sticky-cta fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 shadow-[0_-12px_30px_-18px_rgba(28,39,82,0.5)] backdrop-blur">
      <div className="container-x flex items-center gap-3 py-2.5 md:gap-5 md:py-3">
        <div className="min-w-0 flex-1 leading-tight">
          <p className="hidden truncate text-[0.95rem] font-extrabold text-ink md:block">{title}</p>
          <p className="truncate text-[0.7rem] font-semibold text-muted md:text-xs">
            {price ? "Offer price" : "Tailor-made"}
            <span className="ml-2 hidden text-base font-extrabold text-ink-soft md:inline">{price ?? "Price on request"}</span>
          </p>
          <p className="truncate text-lg font-extrabold text-ink-soft md:hidden">{price ?? "Price on request"}</p>
        </div>
        <a href={contact.phoneHref} aria-label={`Call ${contact.phone}`} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white md:w-auto md:gap-2 md:px-5 md:text-sm md:font-bold">
          <PhoneIcon className="h-5 w-5 md:h-4 md:w-4" />
          <span className="hidden md:inline">{contact.phone}</span>
        </a>
        <a href="#enquire" className="btn btn-ink hidden shrink-0 !py-3 sm:inline-flex">
          Enquire Now
        </a>
        <a href={whatsappLink(contact, `Hello ${contact.name}, I would like to book "${title}".`)} target="_blank" rel="noopener" className="btn btn-gold shrink-0 !px-5 !py-3">
          <WhatsAppIcon className="h-4 w-4" />
          Book Now
        </a>
      </div>
    </div>
  );
}
