import Link from "next/link";
import type { TourPackage } from "@/lib/packages";
import { ArrowIcon, CalendarIcon, PlaneIcon, StarIcon } from "./icons";
import { Photo } from "./Photo";
import { UspChip } from "./UspStrip";

export function PackageCard({ pkg }: { pkg: TourPackage }) {
  const stops = pkg.places.split("·").length;
  return (
    <Link href={`/tour-packages/${pkg.slug}/`} className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-soft">
        <Photo
          name={pkg.cover}
          alt={`${pkg.seoTitle} — ${pkg.places}`}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
        {pkg.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-gold px-3.5 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-ink shadow-sm">
            ★ {pkg.badge}
          </span>
        )}
        <UspChip className="absolute bottom-3 left-4" />
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-display text-[1.7rem] leading-[1.1] text-ink">{pkg.title}</h3>
        <p className="mt-1.5 text-[0.82rem] font-semibold leading-snug text-muted">{pkg.places}</p>

        <ul className="mt-4 space-y-2 text-[0.82rem] text-ink-soft">
          <li className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {pkg.duration && (
              <span className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-gold-deep" />
                {pkg.duration}
              </span>
            )}
            <span className="flex items-center gap-2">
              <PlaneIcon className="h-4 w-4 text-gold-deep" />
              {stops} {stops === 1 ? "destination" : "destinations"}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <StarIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-deep" />
            <span className="line-clamp-1">{pkg.includes.slice(0, 2).join(", ")}</span>
          </li>
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-ink/10 pt-4">
          <div className="mt-4">
            {pkg.price ? (
              <>
                <p className="text-[0.72rem] font-semibold text-muted">
                  Offer price {pkg.wasPrice && <s className="ml-1 font-normal">{pkg.wasPrice}</s>}
                </p>
                <p className="text-[1.7rem] font-extrabold leading-tight tracking-tight text-ink-soft">{pkg.price}</p>
              </>
            ) : (
              <>
                <p className="text-[0.72rem] font-semibold text-muted">Tailor-made</p>
                <p className="text-xl font-extrabold leading-tight text-ink-soft">Price on request</p>
              </>
            )}
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.8rem] font-bold text-white transition-colors group-hover:bg-gold group-hover:text-ink">
            View Itinerary
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
