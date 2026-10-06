import type { Metadata } from "next";
import { adminUrl } from "@/lib/site";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

// The admin panel is hosted by Sanity. /admin simply sends staff there.
export default function AdminRedirect() {
  return (
    <section className="container-x py-40 text-center">
      <meta httpEquiv="refresh" content={`0; url=${adminUrl}`} />
      <h1 className="font-display text-4xl text-ink">Opening the admin panel…</h1>
      <p className="mt-4 text-muted">
        If nothing happens,{" "}
        <a href={adminUrl} className="font-bold underline decoration-gold decoration-2 underline-offset-4">
          open the admin panel
        </a>
        .
      </p>
    </section>
  );
}
