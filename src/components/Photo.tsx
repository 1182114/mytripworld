/* eslint-disable @next/next/no-img-element */
import { photoUrl, type PhotoKey } from "@/lib/images";

type Props = {
  name: PhotoKey;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

const widths = [480, 800, 1200, 1800, 2400];

export function Photo({ name, alt, className, sizes = "100vw", priority }: Props) {
  return (
    <img
      src={photoUrl(name, 1200)}
      srcSet={widths.map((w) => `${photoUrl(name, w)} ${w}w`).join(", ")}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
