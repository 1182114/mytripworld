import { getContent, whatsappLink } from "@/lib/content";
import { PhoneIcon, WhatsAppIcon } from "./icons";

// Mobile-only bottom bar on package pages so the enquiry is always one tap away.
export async function StickyCta({ title, price }: { title: string; price?: string }) {
  const { contact } = await getContent();
  return (
    <div className="sticky-cta fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 px-4 py-2.5 shadow-[0_-12px_30px_-18px_rgba(28,39,82,0.5)] backdrop-blur lg:hidden">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[0.7rem] font-semibold text-muted">{price ? "Offer price" : "Tailor-made"}</p>
          <p className="truncate text-lg font-extrabold text-ink-soft">{price ?? "Price on request"}</p>
        </div>
        <a href={contact.phoneHref} aria-label={`Call ${contact.phone}`} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink">
          <PhoneIcon className="h-5 w-5" />
        </a>
        <a href={whatsappLink(contact, `Hello ${contact.name}, please send me details for "${title}".`)} target="_blank" rel="noopener" className="btn btn-gold shrink-0 !px-5 !py-3">
          <WhatsAppIcon className="h-4 w-4" />
          Send query
        </a>
      </div>
    </div>
  );
}
