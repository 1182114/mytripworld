"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { whatsappLink } from "@/lib/content/link";
import type { Contact } from "@/lib/content/types";

// "Book Now" on WhatsApp. If the visitor arrived from the search, the travel month,
// travellers and tour type they chose are added to the message.
export function BookLink({ contact, title, className, children }: { contact: Pick<Contact, "whatsapp" | "name">; title: string; className?: string; children: ReactNode }) {
  const link = useRef<HTMLAnchorElement>(null);
  const base = `Hello ${contact.name}, I would like to book "${title}".`;

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const details = [
      q.get("month") && `Travel month: ${q.get("month")}`,
      q.get("travellers") && `Travellers: ${q.get("travellers")}`,
      q.get("type") && `Tour type: ${q.get("type")}`,
    ].filter(Boolean);
    if (details.length && link.current) link.current.href = whatsappLink(contact, [base, ...details].join("\n").slice(0, 600));
  }, [contact, base]);

  return (
    <a ref={link} href={whatsappLink(contact, base)} target="_blank" rel="noopener" className={className}>
      {children}
    </a>
  );
}
