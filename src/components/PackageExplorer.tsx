"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { whatsappLink } from "@/lib/content/link";
import type { Contact, Package } from "@/lib/content/types";
import { WhatsAppIcon } from "./icons";
import { PackageCard } from "./PackageCard";

const filters = [
  { id: "all", label: "All trips" },
  { id: "tour", label: "Tours" },
  { id: "cruise", label: "Cruises" },
] as const;

export function PackageExplorer({ packages, contact, chip }: { packages: Package[]; contact: Contact; chip?: string }) {
  const params = useSearchParams();
  const month = params.get("month") ?? "";
  const travellers = params.get("travellers") ?? "";
  const [q, setQ] = useState(params.get("q") ?? "");
  const [kind, setKind] = useState<(typeof filters)[number]["id"]>("all");

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return packages.filter((p) => {
      if (kind === "cruise" && p.kind !== "cruise") return false;
      if (kind === "tour" && p.kind === "cruise") return false;
      if (!needle) return true;
      const haystack = [p.title, p.placesLabel, p.kicker, p.summary, p.kind, ...p.countries, ...p.stops.map((s) => s.name), ...p.highlights.map((h) => h.place)].join(" ").toLowerCase();
      return haystack.includes(needle);
    });
  }, [q, kind, packages]);

  const quoteMessage = [
    `Hello ${contact.name}, I would like a quote.`,
    q && `Destination: ${q}`,
    month && `Travel month: ${month}`,
    travellers && `Travellers: ${travellers}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="container-x">
      <div className="flex flex-col gap-4 rounded-[1.75rem] bg-white p-4 ring-1 ring-ink/5 md:flex-row md:items-center md:p-3 md:pl-6">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search a country, city or trip"
          aria-label="Search packages"
          className="w-full flex-1 bg-transparent px-2 py-2 text-base font-semibold text-ink outline-none placeholder:font-medium placeholder:text-ink/40"
        />
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setKind(f.id)}
              aria-pressed={kind === f.id}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
                kind === f.id ? "bg-ink text-sand" : "bg-sand-deep text-ink-soft hover:bg-gold/40"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {(month || travellers) && (
        <p className="mt-5 text-sm text-muted">
          Planning for{travellers && <strong className="text-ink"> {travellers} traveller(s)</strong>}
          {month && <> in <strong className="text-ink">{month}</strong></>}.{" "}
          <a href={whatsappLink(contact, quoteMessage)} target="_blank" rel="noopener" className="font-bold text-gold-deep underline underline-offset-4">
            Get a price for these dates
          </a>
        </p>
      )}

      {results.length > 0 ? (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} chip={chip} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-[1.75rem] bg-sand-deep px-6 py-14 text-center">
          <p className="font-display text-2xl text-ink">No ready-made package for &ldquo;{q}&rdquo; yet</p>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted">
            We plan custom trips to almost any destination. Tell us where you want to go and we will build it for you.
          </p>
          <a href={whatsappLink(contact, quoteMessage)} target="_blank" rel="noopener" className="btn btn-gold mt-7">
            <WhatsAppIcon className="h-4 w-4" />
            Ask for a custom trip
          </a>
        </div>
      )}
    </div>
  );
}
