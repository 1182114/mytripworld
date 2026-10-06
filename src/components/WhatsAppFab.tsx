import { getContent, whatsappLink } from "@/lib/content";
import { WhatsAppIcon } from "./icons";

export async function WhatsAppFab() {
  const { contact } = await getContent();
  return (
    <a
      href={whatsappLink(contact)}
      target="_blank"
      rel="noopener"
      aria-label={`Chat with ${contact.name} on WhatsApp`}
      className="wa-fab fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_14px_30px_-10px_rgba(37,211,102,0.9)] transition-transform hover:scale-110"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
