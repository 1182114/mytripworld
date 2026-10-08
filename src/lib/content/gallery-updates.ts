import type { RawDoc } from "./source";

// Photo-to-place matches confirmed from the owner's screenshots.
// Asset guards ensure a later replacement photo keeps its own CMS caption.
const corrections = [
  ["01", "945a6073ae5918d2e0d766b295c41b948c6131db-1000x750", "Kuala Lumpur, Malaysia", "Almaty, Kazakhstan"],
  ["02", "d9777c967fd85b0373a28f69c49e7a0a4ca4ab0a-1000x1333", "Batu Caves, Malaysia", "Kazakhstan"],
  ["03", "fee0c63b4a9f88d4e26c127c5ef3e9025013d564-1000x1333", "Ho Chi Minh City, Vietnam", "Bali, Indonesia"],
  ["04", "3cbb0f4da33970118af61810bdc12ff3c98d51b8-1000x750", "Alila Fort Bishangarh", "Singapore"],
  ["05", "76027530a2b1cfaa55153d5679ffa93976dc3342-1000x1333", "Singapore", "Alila Fort Bishangarh"],
  ["06", "19a48a6f95cb8424cd6e3ee989f7b2e3ed8262c0-1000x750", "Bali, Indonesia", "Batu Caves, Malaysia"],
  ["07", "a58e5b069df6fd9fb11bd07cecb4f48a0acdae5a-1000x750", "Almaty, Kazakhstan", "Kuala Lumpur, Malaysia"],
  ["08", "5f6e78fa797a6a3462dc22d1cbccdfdc4074d2fc-1000x1333", "Kazakhstan", "Ho Chi Minh City, Vietnam"],
] as const;

export function applyGalleryUpdates(docs: RawDoc[]): RawDoc[] {
  return docs.map((doc) => {
    if (doc._type !== "galleryItem") return doc;
    const correction = corrections.find(([number]) => doc._id === `gallery-${number}`);
    if (!correction) return doc;
    const [number, asset, previous, place] = correction;
    const image = doc.image as { asset?: { _ref?: string }; _sanityAsset?: string; alt?: string } | undefined;
    if (!image || (image.asset?._ref !== `image-${asset}-jpg`
      && image._sanityAsset !== `image@file://{{ROOT}}/public/gallery/traveller-${number}.jpg`)) return doc;
    return {
      ...doc,
      place: doc.place === previous ? place : doc.place,
      image: image.alt === `My Trip World travellers in ${previous}`
        ? { ...image, alt: `My Trip World travellers in ${place}` }
        : image,
    };
  });
}
