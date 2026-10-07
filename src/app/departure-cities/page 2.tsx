import type { Metadata } from "next";
import Link from "next/link";
import { CityLinks } from "@/components/CityLinks";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { UspStrip } from "@/components/UspStrip";
import { cities } from "@/lib/cities";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Tour Packages from Major Indian Cities",
  description:
    "International tour packages for travellers from Delhi NCR, Mumbai, Bengaluru, Kolkata, Chennai, Hyderabad, Pune and Ahmedabad.",
  path: "/departure-cities/",
  image: "/photos/wing.jpg",
});

export default function DepartureCitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Departure cities"
        title="Tour Packages from Major Indian Cities"
        intro="Our offices are in Gurugram and Narwana, Haryana, and our travellers come from every major metro. Pick your city to see the airport, flight times and how booking works."
        photo="wing"
        alt="An aircraft wing above the clouds"
        crumbs={[{ name: "Departure Cities", href: "/departure-cities/" }]}
      />
      <section className="py-14 md:py-20">
        <div className="container-x">
          <CityLinks />
          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="prose-seo text-[0.98rem] leading-relaxed text-ink-soft">
              <h2 className="font-display text-[2.2rem] leading-tight text-ink">One team, wherever you start</h2>
              <span className="gold-rule mb-5 mt-3" />
              <p>
                You do not need to visit an office to travel with us. Travellers outside Haryana plan and book by
                phone, WhatsApp and email, and receive their tickets and vouchers digitally. The{" "}
                <Link href="/tour-packages/">tour packages</Link> and offer prices are the same for every city; flights
                and routing change with your departure airport.
              </p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {cities.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/${c.slug}/`}>
                      {c.name} — {c.airport} ({c.code})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <UspStrip />
              <p className="mt-3 text-xs text-muted">
                Share your home address when you enquire and our team will confirm the pick-up arrangement for your city.
              </p>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
