import { getContent } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

// Plain-text company summary for AI assistants and answer engines.
// Built from the admin-panel content, so it never drifts out of date.
export async function GET() {
  const { settings, contact, packages, cities, faqs } = await getContent();
  const lines = [
    `# ${settings.name}`,
    "",
    `> ${settings.longDescription}`,
    "",
    "## Company",
    `- Name: ${settings.name}${settings.parent ? ` (${settings.parent})` : ""}`,
    "- Type: Travel company — international tour packages from India, cruise holidays, and India tours for visitors from abroad",
    ...(settings.founded ? [`- Established: ${settings.founded}`] : []),
    "- Tour styles: group tours, individual tours, corporate tours",
    `- Website: ${siteUrl}`,
    "",
    "## What makes it different",
    ...settings.usps.map((u) => `- ${u.title}: ${u.text}`),
    "",
    "## Destinations covered",
    [...new Set(packages.flatMap((p) => p.countries))].join(", "),
    "",
    "## Tour packages",
    ...packages.map(
      (p) =>
        `- [${p.seoTitle}](${siteUrl}/tour-packages/${p.slug}/): ${p.places.join(", ")}${p.duration ? `; ${p.duration}` : ""}; ${p.priceLabel ? `offer price ${p.priceLabel}${p.priceTerms ? ` (${p.priceTerms})` : ""}` : "price on request"}.${p.includes.length ? ` Includes: ${p.includes.join("; ")}.` : ""}`,
    ),
    "",
    `Prices are offer prices published by ${settings.name} and are confirmed in each quote.`,
    "",
    "## Departure cities",
    `${settings.name} serves travellers from every city in India. Cities with their own page:`,
    ...cities.filter((c) => c.hasPage).map((c) => `- [${c.name}](${siteUrl}/${c.slug}/) — ${c.airport} (${c.code})`),
    ...(cities.some((c) => !c.hasPage) ? [`Also served: ${cities.filter((c) => !c.hasPage).map((c) => c.name).join(", ")}, and any other city in India on request.`] : []),
    "",
    "## India tours for international visitors",
    `- [India tour packages for visitors from abroad](${siteUrl}/india-tour-packages/): tailor-made tours planned around the visitor's dates and interests.`,
    "",
    "## Contact",
    `- Phone / WhatsApp: ${contact.phone}`,
    `- Email: ${contact.email}`,
    ...settings.offices.map((o) => `- ${o.city} office: ${[o.street, o.city, [o.region, o.postalCode].filter(Boolean).join(" ")].filter(Boolean).join(", ")}, India`),
    "",
    "## Frequently asked questions",
    ...faqs.flatMap((f) => [`### ${f.q}`, f.a, ""]),
    "## Key pages",
    `- [Tour packages](${siteUrl}/tour-packages/)`,
    `- [Cruise holidays](${siteUrl}/cruise-holidays/)`,
    `- [Departure cities](${siteUrl}/departure-cities/)`,
    `- [About](${siteUrl}/about-us/)`,
    `- [Contact](${siteUrl}/contact/)`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
