import Link from "next/link";
import type { ReactNode } from "react";
import type { Rich } from "@/lib/content/types";

// Renders the simple rich text edited in the admin panel (paragraphs, headings, bullets, bold, links).
export function RichText({ value, headingClass = "font-display text-3xl text-ink" }: { value: Rich; headingClass?: string }) {
  const out: ReactNode[] = [];
  let bullets: ReactNode[] = [];
  const flush = () => {
    if (bullets.length) out.push(<ul key={`ul-${out.length}`} className="list-disc space-y-1.5 pl-5">{bullets}</ul>);
    bullets = [];
  };
  value.forEach((block, i) => {
    const inner = block.spans.map((s, j) => {
      const text = s.bold ? <strong key={j}>{s.text}</strong> : s.text;
      if (!s.href) return <span key={j}>{text}</span>;
      return s.href.startsWith("/") ? (
        <Link key={j} href={s.href}>{text}</Link>
      ) : (
        <a key={j} href={s.href} target="_blank" rel="noopener">{text}</a>
      );
    });
    if (block.list) {
      bullets.push(<li key={i}>{inner}</li>);
      return;
    }
    flush();
    out.push(block.style === "h2" ? <h2 key={i} className={headingClass}>{inner}</h2> : <p key={i}>{inner}</p>);
  });
  flush();
  return <>{out}</>;
}
