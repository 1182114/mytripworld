import { getContent } from "@/lib/content";
import { NamedIcon } from "./icons";

// The company's signature benefits, shown as a quiet badge row rather than loud text.
export async function UspStrip({
  variant = "light",
  stack = false,
  className = "",
}: {
  variant?: "light" | "dark" | "glass";
  stack?: boolean;
  className?: string;
}) {
  const { settings } = await getContent();
  if (!settings.usps.length) return null;

  const shell =
    variant === "dark"
      ? "border-white/15 bg-white/5 text-white"
      : variant === "glass"
        ? "border-ink/10 bg-white/70 text-ink"
        : "border-ink/10 bg-white text-ink shadow-[0_18px_40px_-30px_rgba(28,39,82,0.45)]";
  const sub = variant === "dark" ? "text-white/65" : "text-muted";
  const divider = variant === "dark" ? "border-white/15" : "border-ink/10";

  return (
    <div className={`overflow-hidden rounded-2xl border ${shell} ${className}`}>
      <p className="flex items-center gap-2 bg-gold px-4 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-ink">{settings.uspLabel}</p>
      <ul className={stack || settings.usps.length < 2 ? "grid" : "grid sm:grid-cols-2"}>
        {settings.usps.map((u, i) => (
          <li key={u.title} className={`flex items-start gap-3 px-4 py-3.5 ${i > 0 ? (stack ? `border-t ${divider}` : `border-t ${divider} sm:border-l sm:border-t-0`) : ""}`}>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/20 text-ink-soft ring-1 ring-gold/50">
              <NamedIcon name={u.icon} className={`h-[1.15rem] w-[1.15rem] ${variant === "dark" ? "text-gold" : ""}`} />
            </span>
            <span>
              <span className="block text-[0.9rem] font-extrabold leading-tight">{u.title}</span>
              <span className={`mt-0.5 block text-[0.78rem] leading-snug ${sub}`}>{u.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
