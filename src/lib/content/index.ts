import { mapContent } from "./map";
import { loadRawDocs } from "./source";
import { applyPackageUpdates } from "./package-updates";
import { applyGalleryUpdates } from "./gallery-updates";
import type { City, Content } from "./types";

export type * from "./types";

let cached: Promise<Content> | undefined;

/** All website content, loaded once per build. Throws (and stops the build) if anything required is missing. */
export function getContent(): Promise<Content> {
  cached ??= loadRawDocs().then(({ docs, mode }) => mapContent(applyGalleryUpdates(applyPackageUpdates(docs, mode === "seed"))));
  return cached;
}

export { whatsappLink } from "./link";

export function cityFaqs(city: City, content: Content) {
  const priced = content.packages.filter((p) => p.priceLabel);
  const priceLine = priced.length
    ? `Our offer prices are ${priced.map((p) => `${p.priceLabel} for ${p.title}${p.duration ? ` (${p.duration.toLowerCase()})` : ""}`).join(", ")}.`
    : "Prices are shared with your quote.";
  return [
    { q: `Which airport will I fly from on a tour from ${city.name}?`, a: `Trips from ${city.name} start at ${city.airport} (${city.code}). ${city.notes[0] ?? ""} The exact flights are confirmed with your quote.`.replace(/\s+/g, " ") },
    { q: `Is airport pick-up and drop included from ${city.name}?`, a: `Complimentary home-city to airport pick-up and drop is part of ${content.settings.name} packages. Share your address in ${city.short} when you enquire and our team will confirm the arrangement for your trip.` },
    { q: `Does ${content.settings.name} have an office in ${city.name}?`, a: city.officeAnswer },
    { q: `What do international tour packages from ${city.name} cost?`, a: `${priceLine} The final price for a departure from ${city.short} depends on travel dates and flights, and is confirmed in your quote.` },
    ...city.faqs,
  ];
}
