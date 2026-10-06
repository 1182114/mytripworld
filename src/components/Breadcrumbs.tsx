import Link from "next/link";
import { breadcrumbLd, type Crumb } from "@/lib/seo";
import { ChevronIcon } from "./icons";
import { JsonLd } from "./JsonLd";

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-[0.78rem] font-semibold text-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        {crumbs.map((c, i) => (
          <span key={c.href} className="flex items-center gap-1.5">
            <ChevronIcon className="h-3 w-3" />
            {i === crumbs.length - 1 ? (
              <span aria-current="page" className="text-ink">
                {c.name}
              </span>
            ) : (
              <Link href={c.href} className="hover:text-ink">
                {c.name}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
