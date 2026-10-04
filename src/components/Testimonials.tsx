import { reviews } from "@/lib/packages";
import { site, whatsappLink } from "@/lib/site";
import { ArrowIcon, FacebookIcon, QuoteIcon, StarIcon, WhatsAppIcon } from "./icons";
import { Reveal } from "./Reveal";

const initials = (name: string) =>
  name
    .replace(/^(Mr|Mrs|Ms|Dr)\.?\s+/i, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Stars = () => (
  <span className="flex gap-0.5 text-gold" role="img" aria-label="5 out of 5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <StarIcon key={i} className="h-4 w-4" />
    ))}
  </span>
);

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-ink py-16 text-white md:py-24">
      <QuoteIcon className="pointer-events-none absolute -right-6 -top-6 h-56 w-72 text-white/[0.04]" />
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:gap-14">
        <Reveal>
          <p className="eyebrow !text-gold">Testimonials</p>
          <h2 className="mt-2 font-display text-[2.5rem] leading-[1.05] md:text-[3.4rem]">What Our Travellers Say</h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-white/70">
            Our customers are our brand ambassadors. Here is what they tell us after coming home.
          </p>

          <a
            href={site.social.justdial}
            target="_blank"
            rel="noopener"
            className="mt-7 inline-flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 transition-colors hover:bg-white/10"
          >
            <span className="font-display text-5xl leading-none text-gold">{site.justdialRating.score}</span>
            <span>
              <Stars />
              <span className="mt-1 block text-xs text-white/70">
                Rated on Justdial · {site.justdialRating.count} ratings
              </span>
            </span>
          </a>

          <div className="mt-5 flex flex-wrap gap-3">
            <a href={site.social.facebook} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white hover:text-ink">
              <FacebookIcon className="h-4 w-4" />
              Follow us on Facebook
            </a>
          </div>
        </Reveal>

        <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 120} className="w-[85%] shrink-0 snap-center md:w-auto">
              <figure className="flex h-full flex-col rounded-3xl bg-white p-7 text-ink shadow-[0_30px_60px_-35px_rgba(0,0,0,0.6)] md:p-8">
                <div className="flex items-center justify-between">
                  <Stars />
                  <QuoteIcon className="h-6 w-8 text-gold" />
                </div>
                <blockquote className="mt-5 text-[0.975rem] leading-relaxed text-ink-soft">{r.text}</blockquote>
                <figcaption className="mt-auto flex items-center gap-3 border-t border-ink/10 pt-5">
                  <span className="mt-5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-soft text-sm font-bold text-white" aria-hidden>
                    {initials(r.name)}
                  </span>
                  <span className="mt-5">
                    <span className="block text-sm font-bold">{r.name}</span>
                    <span className="block text-xs text-muted">{r.trip}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}

          <Reveal delay={240} className="w-[85%] shrink-0 snap-center md:col-span-2 md:w-auto">
            <div className="flex h-full flex-col justify-between gap-5 rounded-3xl border border-dashed border-white/25 p-7 md:flex-row md:items-center md:p-8">
              <div>
                <p className="font-display text-2xl">Travelled with My Trip World?</p>
                <p className="mt-1 text-sm text-white/70">Tell us how your trip went — we would love to share your story here.</p>
              </div>
              <a
                href={whatsappLink("Hello My Trip World, I travelled with you and would like to share my review.")}
                target="_blank"
                rel="noopener"
                className="btn btn-gold shrink-0"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Share your review
                <ArrowIcon className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
