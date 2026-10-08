import type { Img } from "./types";

export const nordicSlug = "explore-norway-sweden";

const photos: Record<string, Img> = {
  Oslo: { src: "/destinations/oslo.webp", alt: "Oslo Opera House beside the waterfront at sunset", width: 1600, height: 900, focus: "30% 50%", cdn: false },
  Stockholm: { src: "/destinations/stockholm.webp", alt: "Stockholm's Gamla Stan waterfront illuminated at dusk with reflections on the water", width: 1600, height: 1067, focus: "55% 50%", cdn: false },
};

export function nordicStopImage(slug: string, name: string): Img | undefined {
  return slug === nordicSlug ? photos[name] : undefined;
}
