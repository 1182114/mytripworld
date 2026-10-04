import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
  center,
  light,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`eyebrow ${light ? "!text-gold" : ""}`}>{eyebrow}</p>
      <h2 className={`mt-2 font-display text-[2.5rem] leading-[1.05] md:text-[3.4rem] ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {children && (
        <p className={`mt-5 text-base leading-relaxed md:text-lg ${light ? "text-white/75" : "text-muted"}`}>{children}</p>
      )}
    </div>
  );
}
