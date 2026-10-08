import type { Img } from "./types";

export const europeCruiseSlug = "luxury-europe-msc-cruise";
export const europeLandSlug = "explore-switzerland-italy-france";

const photos: Record<string, Img> = {
  Paris: { src: "/destinations/paris.webp", alt: "The Eiffel Tower in Paris beneath a clear blue sky", width: 1600, height: 2400, focus: "50% 35%", cdn: false },
  Milan: { src: "/destinations/milan.webp", alt: "The ornate marble facade of Milan Cathedral overlooking Piazza del Duomo", width: 1600, height: 1067, cdn: false },
  Zurich: { src: "/destinations/zurich.webp", alt: "Zurich old town and church towers reflected in the Limmat River at sunset", width: 1600, height: 900, focus: "55% 50%", cdn: false },
  Lausanne: { src: "/destinations/lausanne.webp", alt: "Lausanne rooftops overlooking Lake Geneva and the snow-capped Alps", width: 1600, height: 1067, focus: "65% 50%", cdn: false },
  Engelberg: { src: "/destinations/engelberg.webp", alt: "A leafy stone gateway and Swiss village buildings in Engelberg", width: 1600, height: 1067, focus: "30% 50%", cdn: false },
};

export function europeCruiseStopImage(slug: string, name: string): Img | undefined {
  return slug === europeCruiseSlug || slug === europeLandSlug ? photos[name] : undefined;
}
