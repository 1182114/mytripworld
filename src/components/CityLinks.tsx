import Link from "next/link";
import { cities } from "@/lib/cities";
import { PlaneIcon } from "./icons";

export function CityLinks({ current }: { current?: string }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {cities
        .filter((c) => c.slug !== current)
        .map((c) => (
          <li key={c.slug}>
            <Link
              href={`/${c.slug}/`}
              className="group flex h-full items-center gap-3 rounded-2xl bg-white px-4 py-3.5 ring-1 ring-ink/10 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_35px_-25px_rgba(28,39,82,0.5)] hover:ring-gold"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/20 text-ink-soft">
                <PlaneIcon className="h-4 w-4" />
              </span>
              <span className="leading-tight">
                <span className="block text-[0.72rem] font-semibold text-muted">Tour packages from</span>
                <span className="block text-[0.95rem] font-extrabold text-ink">{c.name}</span>
              </span>
              <span className="ml-auto text-[0.7rem] font-bold tracking-wider text-muted group-hover:text-gold-deep">{c.code}</span>
            </Link>
          </li>
        ))}
    </ul>
  );
}
