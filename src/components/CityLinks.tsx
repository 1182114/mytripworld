import Link from "next/link";
import { getContent } from "@/lib/content";
import { PlaneIcon } from "./icons";

/** Links to departure-city pages. `scope` picks the popular cities, the rest, or every city with a page. */
export async function CityLinks({ current, scope = "featured" }: { current?: string; scope?: "featured" | "more" | "all" }) {
  const { cities } = await getContent();
  const list = cities.filter((c) => c.hasPage && c.slug !== current && (scope === "all" || (scope === "featured" ? c.featured : !c.featured)));
  if (!list.length) return null;
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {list.map((c) => (
        <li key={c.slug}>
          <Link
            href={`/${c.slug}/`}
            className="group flex h-full items-center gap-3 rounded-2xl bg-white px-4 py-3.5 ring-1 ring-ink/10 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_35px_-25px_rgba(28,39,82,0.5)] hover:ring-gold"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/20 text-ink-soft">
              <PlaneIcon className="h-4 w-4" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block text-[0.72rem] font-semibold text-muted">Tour packages from</span>
              <span className="block truncate text-[0.95rem] font-extrabold text-ink">{c.name}</span>
            </span>
            <span className="ml-auto text-[0.7rem] font-bold tracking-wider text-muted group-hover:text-gold-deep">{c.code}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** "Don't see your city?" line with a WhatsApp button. */
export async function AnyCityNote({ className = "" }: { className?: string }) {
  const { contact } = await getContent();
  const { whatsappLink } = await import("@/lib/content/link");
  return (
    <p className={`flex flex-col gap-3 rounded-2xl bg-sand-deep px-5 py-4 text-[0.95rem] text-ink-soft sm:flex-row sm:items-center sm:justify-between ${className}`}>
      <span>
        <strong className="text-ink">Don&rsquo;t see your city?</strong> We arrange departures from anywhere in India.
      </span>
      <a href={whatsappLink(contact, `Hello ${contact.name}, I would like to travel from my city. Please help me plan a trip.`)} target="_blank" rel="noopener" className="btn btn-ink shrink-0 !py-2.5">
        Ask on WhatsApp
      </a>
    </p>
  );
}
