import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <>
      <PageHero eyebrow="404" title="This page has wandered off the map" intro="The link may be old or mistyped." photo="wing" alt="" />
      <section className="py-16 text-center">
        <Link href="/" className="btn btn-ink">Back to home</Link>
      </section>
    </>
  );
}
