import type { Metadata } from "next";
import Link from "next/link";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Faq } from "@/components/Faq";
import { CheckIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "India Tour Packages for Foreigners",
  description:
    "Tailor-made India tour packages for visitors from abroad, planned by a travel company in Gurugram near Delhi airport.",
  path: "/india-tour-packages/",
  image: "/photos/planning.jpg",
});

const points = [
  "Tailor-made around your dates, interests and group size",
  "Group, individual and corporate tours",
  "Planned by a team based in Gurugram, close to Delhi's international airport",
  "More than 12 years in the tourism industry",
];

const faqs = [
  {
    q: "Does My Trip World arrange India tours for visitors from other countries?",
    a: "Yes. Alongside international tours for travellers from India, My Trip World welcomes guests from abroad to India and plans their trip as a tailor-made tour.",
  },
  {
    q: "Are there fixed India tour packages with prices?",
    a: "India tours are tailor-made rather than fixed. Tell us your travel dates, the places you would like to see and the size of your group, and our team will send an itinerary and a price.",
  },
  {
    q: "Where is My Trip World based?",
    a: "Our offices are in Gurugram and Narwana, in the state of Haryana. The Gurugram office is in the Delhi National Capital Region, close to Indira Gandhi International Airport.",
  },
  {
    q: "How do I contact you from outside India?",
    a: "WhatsApp is the easiest way: message +91 97280-24440. You can also email info@mytripworld.net or use the enquiry form on this page.",
  },
];

export default function IndiaToursPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "India tour packages for international visitors",
          serviceType: "Inbound tours to India",
          url: `${site.url}/india-tour-packages/`,
          provider: { "@id": `${site.url}/#organization` },
          areaServed: { "@type": "Country", name: "India" },
        }}
      />
      <PageHero
        eyebrow="Inbound tours"
        title="India Tour Packages for Visitors from Abroad"
        intro="We take travellers from India across the world — and we welcome guests from abroad to India. Tell us what you would like to see and we will plan it for you."
        photo="planning"
        alt="A map, camera and notebook laid out while planning a trip to India"
        crumbs={[{ name: "India Tours", href: "/india-tour-packages/" }]}
      />

      <section className="py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_0.9fr] lg:gap-14">
          <Reveal>
            <h2 className="font-display text-[2.2rem] leading-tight text-ink">A local team for your India trip</h2>
            <span className="gold-rule mt-3" />
            <div className="prose-seo mt-5 text-base leading-relaxed text-ink-soft">
              <p>
                My Trip World is a travel company in Haryana, India, with an office in Gurugram in the Delhi National
                Capital Region. We have planned group, individual and corporate tours for more than twelve years.
              </p>
              <p>
                India tours for international visitors are planned to order. Rather than a fixed brochure, you tell us
                your dates, your interests and who is travelling, and we build the itinerary and price around that. To
                see how we work with travellers going the other way, look at our{" "}
                <Link href="/tour-packages/">international tour packages from India</Link>.
              </p>
            </div>
            <ul className="mt-7 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[0.95rem] font-semibold text-ink-soft">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 font-display text-[2.2rem] leading-tight text-ink">Questions about India tours</h2>
            <span className="gold-rule mb-6 mt-3" />
            <Faq items={faqs} />
          </Reveal>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <EnquiryForm defaultTrip="Custom / other destination" />
          </aside>
        </div>
      </section>
    </>
  );
}
