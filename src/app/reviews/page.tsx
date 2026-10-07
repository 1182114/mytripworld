import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { StarIcon, WhatsAppIcon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { ReviewGrid } from "@/components/ReviewGrid";
import { reviewStats } from "@/components/Testimonials";
import { getContent, whatsappLink } from "@/lib/content";
import { imgUrl } from "@/lib/img";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, testimonials, pages } = await getContent();
  return pageMeta({
    title: "Customer Reviews",
    description: `Read ${testimonials.length > 5 ? `${testimonials.length} ` : ""}reviews from travellers who booked their international tours and holidays with ${settings.name}.`,
    path: "/reviews/",
    image: pages.gallery.heroImage && imgUrl(pages.gallery.heroImage),
    siteName: settings.name,
  });
}

export default async function ReviewsPage() {
  const { testimonials, settings, contact, pages } = await getContent();
  const { count, average } = reviewStats(testimonials);
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="What Our Travellers Say"
        intro={`Reviews from people who travelled with ${settings.name}, in their own words.`}
        image={pages.gallery.heroImage}
        crumbs={[{ name: "Reviews", href: "/reviews/" }]}
      >
        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink/10 pt-5">
          {average && count >= 5 && (
            <p className="flex items-center gap-3">
              <span className="font-display text-[2.4rem] !font-bold leading-none text-ink-soft">{average.toFixed(1)}</span>
              <span>
                <span className="flex gap-0.5 text-gold" role="img" aria-label={`${average} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className={`h-4 w-4 ${i < Math.round(average) ? "" : "text-ink/15"}`} />
                  ))}
                </span>
                <span className="block text-xs font-semibold text-muted">average rating</span>
              </span>
            </p>
          )}
          <p className="text-sm font-bold text-ink">
            {count} {count === 1 ? "review" : "reviews"}
          </p>
          <a href={whatsappLink(contact, `Hello ${contact.name}, I travelled with you and would like to share my review.`)} target="_blank" rel="noopener" className="btn btn-gold !py-2.5">
            <WhatsAppIcon className="h-4 w-4" />
            Share your review
          </a>
        </div>
      </PageHero>

      <section className="py-14 md:py-20">
        <div className="container-x">
          <ReviewGrid reviews={testimonials} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
