import { cities } from "@/lib/cities";
import { faqs } from "@/lib/faq";
import { packages } from "@/lib/packages";
import { site } from "@/lib/site";
import { usps } from "@/lib/usps";

export const dynamic = "force-static";

// Plain-text company summary for AI assistants and answer engines.
// Built from the same data as the site, so it never drifts out of date.
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "## Company",
    `- Name: ${site.name} (${site.parent})`,
    "- Type: Travel company — international tour packages from India, cruise holidays, and India tours for visitors from abroad",
    "- Experience: more than 12 years in the tourism industry",
    "- Tour styles: group tours, individual tours, corporate tours",
    `- Website: ${site.url}`,
    "",
    "## What makes it different",
    ...usps.map((u) => `- ${u.title}: ${u.text}`),
    "- One offer price covering international flights, hotel stay, airport transfers and sightseeing",
    "",
    "## Tour packages",
    ...packages.map(
      (p) =>
        `- [${p.seoTitle}](${site.url}/tour-packages/${p.slug}/): ${p.places.replace(/ · /g, ", ")}${p.duration ? `; ${p.duration}` : ""}; ${p.price ? `offer price ${p.price}` : "price on request"}. Includes: ${p.includes.join("; ")}.`,
    ),
    "",
    "Prices are offer prices published by My Trip World and are confirmed in each quote.",
    "",
    "## Departure cities served in India",
    ...cities.map((c) => `- [${c.name}](${site.url}/${c.slug}/) — ${c.airport} (${c.code})`),
    "",
    "## India tours for international visitors",
    `- [India tour packages for visitors from abroad](${site.url}/india-tour-packages/): tailor-made tours planned around the visitor's dates and interests.`,
    "",
    "## Contact",
    `- Phone / WhatsApp: ${site.phoneDisplay}`,
    `- Email: ${site.email}`,
    ...site.offices.map((o) => `- ${o.city} office: ${o.lines.join(", ")}, India`),
    "",
    "## Frequently asked questions",
    ...faqs.flatMap((f) => [`### ${f.q}`, f.a, ""]),
    "## Key pages",
    `- [Tour packages](${site.url}/tour-packages/)`,
    `- [Cruise holidays](${site.url}/cruise-holidays/)`,
    `- [Departure cities](${site.url}/departure-cities/)`,
    `- [About](${site.url}/about-us/)`,
    `- [Contact](${site.url}/contact/)`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
