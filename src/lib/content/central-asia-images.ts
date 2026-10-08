import type { Img } from "./types";

export const centralAsiaSlug = "explore-kazakhstan-uzbekistan";

const photos: Record<string, Img> = {
  Almaty: { src: "/destinations/almaty.webp", alt: "Big Almaty Lake beneath the snow-capped Trans-Ili Alatau mountains in Kazakhstan", width: 1600, height: 1200, cdn: false },
  Samarkand: { src: "/destinations/samarkand.webp", alt: "Registan Square in Samarkand with turquoise domes and ornate madrasas in the morning light", width: 1600, height: 1079, cdn: false },
  Tashkent: { src: "/destinations/tashkent.webp", alt: "The tiled entrance and leafy courtyard of Kukeldash Madrasah in Tashkent", width: 1600, height: 1066, cdn: false },
};

export function centralAsiaCover(slug: string): Img | undefined {
  return slug === centralAsiaSlug ? photos.Samarkand : undefined;
}

export function centralAsiaStopImage(slug: string, name: string): Img | undefined {
  return slug === centralAsiaSlug ? photos[name] : undefined;
}
