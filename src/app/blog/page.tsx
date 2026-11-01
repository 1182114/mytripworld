import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Pic } from "@/components/Pic";
import { Reveal } from "@/components/Reveal";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

const title = "Travel Guides for International Trips from India";
const description = "Practical guides for Indian travellers: documents, visas, cruises and how to plan international tours.";

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getContent();
  return pageMeta({ title, description, path: "/blog/", siteName: settings.name });
}

export default async function BlogPage() {
  const { posts } = await getContent();
  return (
    <>
      <PageHero eyebrow="Travel guides" title="Plan your trip with confidence" intro={description} crumbs={[{ name: "Travel Guides", href: "/blog/" }]} />
      <section className="py-14 md:py-20">
        <div className="container-x grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 90}>
              <Link href={`/blog/${p.slug}/`} className="card card-hover group flex h-full flex-col overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden bg-ink-soft">
                  <Pic img={p.cover} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110" />
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <p className="text-xs font-semibold text-muted">{p.dateLabel}</p>
                  <h2 className="mt-2 font-display text-[1.6rem] leading-[1.15] text-ink">{p.title}</h2>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{p.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
