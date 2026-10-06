 
import manifest from "@/lib/gallery-manifest.json";

type Key = keyof typeof manifest;

export function TravellerPhoto({ src, place, className, sizes }: { src: string; place: string; className?: string; sizes: string }) {
  const base = src.replace(/\.jpg$/, "");
  const dims = manifest[base.split("/").pop() as Key];
  return (
    <picture className="contents">
      <source type="image/webp" srcSet={`${base}-500.webp 500w, ${base}.webp 1000w`} sizes={sizes} />
      <img
        src={src}
        alt={`My Trip World travellers in ${place}`}
        width={dims?.width}
        height={dims?.height}
        loading="lazy"
        decoding="async"
        className={className}
      />
    </picture>
  );
}
