 
import type { CSSProperties } from "react";
import type { Img } from "@/lib/content/types";
import { imgUrl, sources } from "@/lib/img";

type Props = {
  img: Img;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  style?: CSSProperties;
  /** Set false for images whose box is sized by CSS only (e.g. absolutely positioned backgrounds). */
  dimensions?: boolean;
};

// One image component for the whole site: responsive sizes, modern formats,
// lazy loading below the fold, and the focal point chosen in the admin panel.
export function Pic({ img, alt, className, sizes = "100vw", priority, style, dimensions = false }: Props) {
  const { webp, fallback } = sources(img);
  const single = webp && !webp.includes(" ");
  return (
    <picture className="contents">
      {webp && <source type="image/webp" srcSet={webp} sizes={single ? undefined : sizes} />}
      <img
        src={imgUrl(img, 1600)}
        srcSet={fallback}
        sizes={fallback ? sizes : undefined}
        alt={alt ?? img.alt}
        width={dimensions ? img.width : undefined}
        height={dimensions ? img.height : undefined}
        className={className}
        style={img.focus ? { objectPosition: img.focus, ...style } : style}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
    </picture>
  );
}
