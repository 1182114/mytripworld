import { CarIcon } from "./icons";

export function UspChip({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[0.68rem] font-bold text-ink-soft shadow-sm ${className}`}>
      <CarIcon className="h-3.5 w-3.5 text-gold-deep" />
      {label}
    </span>
  );
}
