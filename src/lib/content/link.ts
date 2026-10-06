import type { Contact } from "./types";

// Kept separate from index.ts so client components can import it without pulling in build-time loaders.
export function whatsappLink(contact: Pick<Contact, "whatsapp" | "name">, message?: string) {
  const text = message ?? `Hello ${contact.name}, I would like to plan a trip.`;
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;
}
