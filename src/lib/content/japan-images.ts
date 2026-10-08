import type { Img } from "./types";

const photos: Record<string, Img> = {
  Tokyo: { src: "/destinations/tokyo.webp", alt: "Tokyo Tower illuminated above the Tokyo skyline at dusk", focus: "22% 50%", cdn: false },
  Osaka: { src: "/destinations/osaka.webp", alt: "Osaka Castle with its green roofs and surrounding trees", focus: "65% 45%", cdn: false },
  Kyoto: { src: "/destinations/kyoto.webp", alt: "Yasaka Pagoda above a traditional street in Kyoto", cdn: false },
};

export function japanStopImage(slug: string, name: string): Img | undefined {
  return slug === "explore-japan" ? photos[name] : undefined;
}
