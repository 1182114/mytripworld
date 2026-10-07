import Link from "next/link";
import { getContent, whatsappLink } from "@/lib/content";
import type { Testimonial } from "@/lib/content";
import { Carousel } from "./Carousel";
import { ArrowIcon, FacebookIcon, QuoteIcon, StarIcon, WhatsAppIcon } from "./icons";
import { Reveal } from "./Reveal";
import { ReviewCard } from "./ReviewCard";

/** Average of the star ratings customers actually gave (never invented). */
export function reviewStats(reviews: Testimonial[]) {
  const rated = reviews.filter((r) => r.rating);
  const average = rated.length ? rated.reduce((sum, r) => sum + r.rating!, 0) / rated.length : undefined;
  return { count: reviews.length, average: average ? Math.round(average * 10) / 10 : undefined };
}

const HOME_LIMIT = 12;

// Home-page reviews: a swipeable row that works the same with 3 reviews or 300.
// Only the first dozen are shown here; the rest live on /reviews/.
export async function Testimonials() {
  const { testimonials, settings, contact } = await getContent();
  if (!testimonials.length) return null;
  const { count, average } = reviewStats(testimonials);
  const shown = testimonials.slice(0, HOME_LIMIT);

  return (
    <section className="relative overflow-hidden bg-ink py-16 text-white md:py-24">
      <QuoteIcon className="pointer-events-none absolute -right-6 -top-6 h-56 w-72 text-white/[0.04]" />
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="eyebrow !text-gold">Testimonials</p>
            <h2 className="mt-2 font-display text-[2.5rem] leading-[1.05] md:text-[3.4rem]">What Our Travellers Say</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">Our customers are our brand ambassadors. Here is what they tell us after coming home.</p>
          </Reveal>

          <Reveal delay={100} className="flex flex-wrap items-stretch gap-3">
            {/* Shown once there are enough reviews for an average to mean something */}
            {average && count >= 5 && (
              <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5">
                <span className="font-display text-[2.6rem] !font-bold leading-none text-gold">{average.toFixed(1)}</span>
                <span>
                  <span className="flex gap-0.5 text-gold" role="img" aria-label={`${average} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} className={`h-4 w-4 ${i < Math.round(average) ? "" : "text-white/20"}`} />
                    ))}
                  </span>
                  <span className="mt-1 block text-xs text-white/70">from {count} traveller reviews</span>
                </span>
              </div>
            )}
            {settings.justdialRating && settings.social.justdial && (
              <a href={settings.social.justdial} target="_blank" rel="noopener" className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 transition-colors hover:bg-white/10">
                <span className="font-display text-[2.6rem] !font-bold leading-none text-gold">{settings.justdialRating.score}</span>
                <span>
                  <span className="block text-sm font-bold">Rated on Justdial</span>
                  <span className="mt-0.5 block text-xs text-white/70">{settings.justdialRating.count} ratings</span>
                </span>
              </a>
            )}
          </Reveal>
        </div>

        <Reveal delay={150} className="mt-10">
          <Carousel label="Traveller reviews" tone="dark" interval={5500}>
            {shown.map((r, i) => (
              <ReviewCard key={`${r.name}-${i}`} review={r} fill />
            ))}
          </Carousel>
        </Reveal>

        <Reveal className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-3">
            <Link href="/reviews/" className="btn btn-gold">
              {count > shown.length ? `Read all ${count} reviews` : "Read all reviews"}
              <ArrowIcon className="h-4 w-4" />
            </Link>
            {settings.social.facebook && (
              <a href={settings.social.facebook} target="_blank" rel="noopener" className="btn btn-ghost">
                <FacebookIcon className="h-4 w-4" />
                Follow us on Facebook
              </a>
            )}
          </div>
          <a href={whatsappLink(contact, `Hello ${contact.name}, I travelled with you and would like to share my review.`)} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-sm font-bold text-white/85 hover:text-gold">
            <WhatsAppIcon className="h-4 w-4" />
            Travelled with us? Share your review
          </a>
        </Reveal>
      </div>
    </section>
  );
}
