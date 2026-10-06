import { faqLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export function Faq({ items, schema = true }: { items: { q: string; a: string }[]; schema?: boolean }) {
  return (
    <>
      {schema && <JsonLd data={faqLd(items)} />}
      <div className="divide-y divide-ink/10 overflow-hidden rounded-3xl bg-white ring-1 ring-ink/10">
        {items.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-[0.98rem] font-bold text-ink transition-colors hover:bg-sand md:px-7 md:py-5 [&::-webkit-details-marker]:hidden">
              {f.q}
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/25 text-lg font-bold leading-none text-ink-soft transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="px-5 pb-5 text-[0.95rem] leading-relaxed text-muted md:px-7 md:pb-6">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
