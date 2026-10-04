/* eslint-disable @next/next/no-img-element */
import { photoUrl, type PhotoKey } from "@/lib/images";

type Props = {
  name: PhotoKey;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function Photo({ name, alt, className, sizes = "100vw", priority }: Props) {
  return (
    <img
      src={photoUrl(name, 1600)}
      srcSet={`${photoUrl(name, 800)} 800w, ${photoUrl(name, 1600)} 1600w`}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
