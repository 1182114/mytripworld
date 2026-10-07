"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { Img } from "@/lib/content/types";
import { BuildingIcon, CalendarIcon, PinIcon, SearchIcon, UserIcon, UsersIcon } from "./icons";
import { Pic } from "./Pic";

export type SearchDestination = { name: string; image: Img; count: number };

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const tourTypes = [
  { id: "Group Tour", icon: UsersIcon },
  { id: "Individual Tour", icon: UserIcon },
  { id: "Corporate Tour", icon: BuildingIcon },
];

type Panel = "where" | "when" | "who" | null;

function Field({
  icon,
  label,
  value,
  placeholder,
  active,
  onClick,
  divider,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  placeholder: string;
  active: boolean;
  onClick: () => void;
  divider?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={active}
      className={`flex w-full min-w-0 items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition-colors md:h-full md:px-6 ${
        active ? "bg-ink/[0.07]" : "hover:bg-ink/[0.04]"
      } ${divider ? "md:relative md:before:absolute md:before:-left-1 md:before:top-1/4 md:before:h-1/2 md:before:w-px md:before:bg-ink/15" : ""}`}
    >
      <span className="shrink-0 text-ink-soft">{icon}</span>
      <span className="min-w-0">
        <span className="block text-[0.8rem] font-bold tracking-wide text-muted">{label}</span>
        <span className={`block truncate text-base font-bold leading-snug ${value ? "text-ink" : "text-ink/55"}`}>{value || placeholder}</span>
      </span>
    </button>
  );
}

function Stepper({ label, note, value, min, onChange }: { label: string; note: string; value: number; min: number; onChange: (v: number) => void }) {
  const btn =
    "flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-lg font-bold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink";
  return (
    <div className="flex items-center justify-between gap-6 py-3">
      <div>
        <p className="text-sm font-bold text-ink">{label}</p>
        <p className="text-xs text-muted">{note}</p>
      </div>
      <div className="flex items-center gap-3">
        <button type="button" className={btn} disabled={value <= min} onClick={() => onChange(value - 1)} aria-label={`Fewer ${label.toLowerCase()}`}>
          −
        </button>
        <span className="w-5 text-center text-sm font-bold text-ink">{value}</span>
        <button type="button" className={btn} disabled={value >= 30} onClick={() => onChange(value + 1)} aria-label={`More ${label.toLowerCase()}`}>
          +
        </button>
      </div>
    </div>
  );
}

export function HeroSearch({ destinations }: { destinations: SearchDestination[] }) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const [type, setType] = useState(tourTypes[0].id);
  const [panel, setPanel] = useState<Panel>(null);
  const [q, setQ] = useState("");
  const [month, setMonth] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setPanel(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanel(null);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const toggle = (p: Panel) => setPanel((cur) => (cur === p ? null : p));
  const travellers = `${adults} adult${adults > 1 ? "s" : ""}${children ? `, ${children} child${children > 1 ? "ren" : ""}` : ""}`;
  const matches = destinations.filter((d) => d.name.toLowerCase().includes(q.trim().toLowerCase()));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (month) params.set("month", month);
    params.set("travellers", travellers);
    params.set("type", type);
    router.push(`/tour-packages/?${params.toString()}`);
  };

  const popover =
    "absolute left-0 right-0 top-full z-30 mt-2 rounded-2xl bg-white p-3.5 shadow-[0_20px_45px_-20px_rgba(28,39,82,0.45)] ring-1 ring-ink/10";

  return (
    <div ref={rootRef} className="relative z-20">
      <div className="glass-solid mb-3 inline-flex max-w-full overflow-hidden rounded-full" role="radiogroup" aria-label="Type of trip">
        {tourTypes.map((t, i) => {
          const active = type === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setType(t.id)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 text-[0.8rem] font-bold transition-colors min-[380px]:px-5 min-[380px]:text-[0.875rem] sm:min-w-[8.5rem] sm:px-7 ${
                i > 0 && !active && type !== tourTypes[i - 1].id ? "border-l border-ink/10" : "border-l border-transparent"
              } ${active ? "bg-ink-soft text-white" : "text-ink-soft hover:bg-ink/5"}`}
            >
              <t.icon className="hidden h-4 w-4 min-[380px]:block" />
              {t.id.replace(" Tour", "")}
            </button>
          );
        })}
      </div>

      <form
        onSubmit={onSubmit}
        role="search"
        aria-label="Find a tour package"
        className="glass-solid relative grid gap-1.5 rounded-[1.35rem] p-2.5 md:h-[5.5rem] md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-stretch md:gap-2 md:p-3"
      >
        <Field icon={<PinIcon className="h-5 w-5" />} label="Destination" value={q} placeholder="Where to?" active={panel === "where"} onClick={() => toggle("where")} />
        <Field icon={<CalendarIcon className="h-5 w-5" />} label="Travel Date" value={month} placeholder="Select month" active={panel === "when"} onClick={() => toggle("when")} divider />
        <Field icon={<UsersIcon className="h-5 w-5" />} label="Travellers" value={travellers} placeholder="Add guests" active={panel === "who"} onClick={() => toggle("who")} divider />
        <button type="submit" className="btn btn-gold mt-1 !rounded-2xl !px-8 !py-4 !text-base md:ml-2 md:mt-0 md:h-full">
          <SearchIcon className="h-5 w-5" />
          Explore Trips
        </button>

        {panel === "where" && (
          <div className={`${popover} md:right-auto md:w-[26rem]`}>
            <label className="flex items-center gap-3 rounded-full bg-sand px-4 py-2.5 ring-1 ring-ink/10 focus-within:ring-2 focus-within:ring-gold">
              <SearchIcon className="h-4 w-4 text-muted" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Type a country or city"
                aria-label="Destination"
                className="w-full bg-transparent text-sm font-semibold text-ink outline-none placeholder:font-medium placeholder:text-ink/40"
              />
            </label>
            <p className="mb-1 mt-3 px-1 text-xs font-semibold text-muted">Destinations</p>
            <ul className="grid max-h-72 grid-cols-2 gap-1 overflow-y-auto">
              {(matches.length ? matches : destinations).map((d) => {
                const n = d.count;
                return (
                  <li key={d.name}>
                    <button
                      type="button"
                      onClick={() => {
                        setQ(d.name);
                        setPanel("when");
                      }}
                      className="flex w-full items-center gap-3 rounded-2xl p-2 text-left transition-colors hover:bg-sand-deep"
                    >
                      <Pic img={d.image} alt="" sizes="48px" className="h-12 w-12 rounded-xl bg-sand-deep object-cover" />
                      <span>
                        <span className="block text-sm font-bold text-ink">{d.name}</span>
                        <span className="block text-xs text-muted">
                          {n} package{n === 1 ? "" : "s"}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {q.trim() && !matches.length && (
              <p className="mt-3 px-1 text-xs text-muted">
                Press <strong className="text-ink">Explore Trips</strong> to search for &ldquo;{q.trim()}&rdquo; — we plan custom trips too.
              </p>
            )}
          </div>
        )}

        {panel === "when" && (
          <div className={`${popover} md:left-[36%] md:right-auto md:w-[20rem]`}>
            <p className="mb-2.5 px-1 text-xs font-semibold text-muted">Travel month</p>
            <div className="grid grid-cols-4 gap-2">
              {months.map((m, i) => {
                const active = month === monthNames[i];
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setMonth(active ? "" : monthNames[i]);
                      setPanel("who");
                    }}
                    className={`rounded-xl py-2.5 text-sm font-bold transition-colors ${active ? "bg-ink-soft text-white" : "bg-sand text-ink hover:bg-gold/40"}`}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => {
                setMonth("");
                setPanel("who");
              }}
              className="mt-3 w-full rounded-xl py-2 text-xs font-bold text-muted hover:text-ink"
            >
              I&rsquo;m flexible
            </button>
          </div>
        )}

        {panel === "who" && (
          <div className={`${popover} md:left-auto md:right-40 md:w-[18rem]`}>
            <div className="divide-y divide-ink/10">
              <Stepper label="Adults" note="Age 12+" value={adults} min={1} onChange={setAdults} />
              <Stepper label="Children" note="Age 2–11" value={children} min={0} onChange={setChildren} />
            </div>
            <button type="button" onClick={() => setPanel(null)} className="btn btn-ink mt-3 w-full !py-2.5">
              Done
            </button>
          </div>
        )}
      </form>

    </div>
  );
}
