import Link from "next/link";
import type { TourPackage } from "@/lib/packages";
import { ArrowIcon, CalendarIcon, PlaneIcon, StarIcon } from "./icons";
import { Photo } from "./Photo";

export function PackageCard({ pkg }: { pkg: TourPackage }) {
  const stops = pkg.places.split("·").length;
  return (
    <Link
      href={`/tour-packages/${pkg.slug}/`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_25px_50px_-35px_rgba(28,39,82,0.5)] ring-1 ring-ink/5 transition-transform duration-500 hover:-translate-y-1.5"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-ink-soft">
        <Photo
          name={pkg.cover}
          alt={`${pkg.title} — ${pkg.places}`}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
        />
        {pkg.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-gold px-3.5 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-ink">
            ★ {pkg.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-[1.15rem] font-extrabold leading-snug tracking-tight text-ink">{pkg.title}</h3>
            <p className="mt-1 text-[0.82rem] leading-snug text-ink-soft">{pkg.places}</p>
          </div>
          <div className="shrink-0 text-right">
            {pkg.price ? (
              <>
                <p className="text-[0.7rem] text-muted">Offer price</p>
                <p className="text-[1.35rem] font-extrabold leading-tight text-teal">{pkg.price}</p>
                {pkg.wasPrice && <s className="text-[0.72rem] text-muted">{pkg.wasPrice}</s>}
              </>
            ) : (
              <>
                <p className="text-[0.7rem] text-muted">Tailor-made</p>
                <p className="text-base font-extrabold leading-tight text-teal">On request</p>
              </>
            )}
          </div>
        </div>

        <ul className="mt-4 space-y-2 text-[0.8rem] text-ink-soft">
          <li className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {pkg.duration && (
              <span className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {pkg.duration}
              </span>
            )}
            <span className="flex items-center gap-2">
              <PlaneIcon className="h-4 w-4" />
              {stops} {stops === 1 ? "destination" : "destinations"}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <StarIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-deep" />
            <span className="line-clamp-1">{pkg.includes.slice(0, 2).join(", ")}</span>
          </li>
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <div className="flex -space-x-2">
            {pkg.gallery.slice(0, 4).map((g) => (
              <Photo key={g} name={g} alt="" sizes="40px" className="h-9 w-9 rounded-full bg-sand-deep object-cover ring-2 ring-white" />
            ))}
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.8rem] font-bold text-white transition-colors group-hover:bg-gold group-hover:text-ink">
            View Itinerary
            <ArrowIcon className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
