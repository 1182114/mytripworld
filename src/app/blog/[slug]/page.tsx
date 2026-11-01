import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/EnquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { PackageCard } from "@/components/PackageCard";
import { PageHero } from "@/components/PageHero";
import { getContent } from "@/lib/content";
import { absoluteImg, imgUrl } from "@/lib/img";
import { pageMeta } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

export const dynamicParams = false;

export async function generateStaticParams() {
  const { posts } = await getContent();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { posts, settings } = await getContent();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return pageMeta({ title: post.seoTitle, description: post.seoDescription, path: `/blog/${post.slug}/`, image: imgUrl(post.cover), siteName: settings.name });
}

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const { posts, packages, settings } = await getContent();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const related = post.packages.map((s) => packages.find((p) => p.slug === s)).filter((p) => p !== undefined);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.seoDescription,
          image: absoluteImg(post.cover),
          datePublished: post.date,
          url: `${siteUrl}/blog/${post.slug}/`,
          author: { "@id": `${siteUrl}/#organization` },
          publisher: { "@id": `${siteUrl}/#organization` },
        }}
      />
      <PageHero
        eyebrow="Travel guide"
        title={post.title}
        intro={post.excerpt}
        image={post.cover}
        crumbs={[
          { name: "Travel Guides", href: "/blog/" },
          { name: post.title, href: `/blog/${post.slug}/` },
        ]}
      />
      <section className="py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_0.9fr] lg:gap-14">
          <article>
            <p className="text-xs font-semibold text-muted">Published {post.dateLabel}</p>
            {post.sections.map((s) => (
              <section key={s.heading} className="mt-8">
                <h2 className="font-display text-[1.9rem] leading-tight text-ink">{s.heading}</h2>
                {s.blocks.map((b, i) =>
                  b.bullets ? (
                    <ul key={i} className="mt-3 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-ink-soft marker:text-gold-deep">
                      {b.bullets.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={i} className="mt-3 text-base leading-relaxed text-ink-soft">{b.text}</p>
                  ),
                )}
              </section>
            ))}
            {related.length > 0 && (
              <>
                <h2 className="mt-12 font-display text-[2rem] leading-tight text-ink">Related packages</h2>
                <span className="gold-rule mt-3" />
                <div className="mt-7 grid gap-7 sm:grid-cols-2">
                  {related.map((p) => (
                    <PackageCard key={p.slug} pkg={p} chip={settings.uspChip} />
                  ))}
                </div>
              </>
            )}
          </article>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <EnquiryForm defaultTrip="Custom / other destination" defaultMessage={`Read: ${post.title}`} />
          </aside>
        </div>
      </section>
    </>
  );
}
