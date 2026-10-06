import type { Img } from "./content/types";
import { siteUrl } from "./site";

const cdnWidths = [480, 800, 1200, 1600, 2000];

/** A single URL for the image at roughly the given width (used for share images and schema). */
export function imgUrl(img: Img, width = 1200) {
  return img.cdn ? `${img.src}?w=${width}&auto=format&fit=max&q=75` : img.src;
}

export function absoluteImg(img: Img, width = 1200) {
  const url = imgUrl(img, width);
  return url.startsWith("http") ? url : `${siteUrl}${url}`;
}

/** srcset strings: Sanity's image CDN resizes on the fly; local files use the pre-made sizes in /public. */
export function sources(img: Img): { webp?: string; fallback?: string } {
  if (img.cdn) {
    const widths = cdnWidths.filter((w) => !img.width || w <= img.width);
    if (img.width && !widths.includes(img.width) && img.width < 2000) widths.push(img.width);
    return { fallback: widths.map((w) => `${img.src}?w=${w}&auto=format&fit=max&q=75 ${w}w`).join(", ") };
  }
  const base = img.src.replace(/\.\w+$/, "");
  if (img.src.startsWith("/photos/")) return { webp: `${base}-800.webp 800w, ${base}.webp 1600w`, fallback: `${base}-800.jpg 800w, ${base}.jpg 1600w` };
  if (img.src.startsWith("/gallery/")) return { webp: `${base}-500.webp 500w, ${base}.webp 1000w` };
  if (img.src === "/hero.jpg") return { webp: "/hero-900.webp 900w, /hero.webp 1672w", fallback: "/hero-900.jpg 900w, /hero.jpg 1672w" };
  if (img.src === "/logo.png") return { webp: "/logo.webp" };
  return {};
}
