 
import { photoUrl, type PhotoKey } from "@/lib/images";

type Props = {
  name: PhotoKey;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

const webp = (url: string) => url.replace(/\.jpg$/, ".webp");

// WebP first, JPEG fallback. `display: contents` keeps the <img> as the layout box.
export function Photo({ name, alt, className, sizes = "100vw", priority }: Props) {
  const small = photoUrl(name, 800);
  const large = photoUrl(name, 1600);
  return (
    <picture className="contents">
      <source type="image/webp" srcSet={`${webp(small)} 800w, ${webp(large)} 1600w`} sizes={sizes} />
      <img
        src={large}
        srcSet={`${small} 800w, ${large} 1600w`}
        sizes={sizes}
        alt={alt}
        className={className}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
    </picture>
  );
}
