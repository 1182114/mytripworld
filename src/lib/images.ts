// Stock photography served from Unsplash's image CDN (free licence).
// Swap any id for a client-owned photo in /public when available.
export const photos = {
  heroCove: "1537956965359-7573183d1f57",
  heroLake: "1476514525535-07fb3b4ae5f1",
  singapore: "1525625293386-3f8f99389edd",
  merlion: "1565967511849-76a60a516170",
  baliTemple: "1537996194471-e657df975ab4",
  baliRice: "1555400038-63f5ba517a47",
  nusaPenida: "1539367628448-4bc5c9d171c8",
  halong: "1528127269322-539801943592",
  saigon: "1583417319070-4a69db38a482",
  goldenBridge: "1559592413-7cec4d0cae2b",
  thailand: "1552465011-b4e21bf6e79a",
  thaiLake: "1519451241324-20b4ea2c4220",
  bangkok: "1508009603885-50cf7c579365",
  petronas: "1596422846543-75c6fc197f07",
  sydney: "1506973035872-a4ec16b8e8d9",
  skylineDusk: "1507699622108-4be3abd695ad",
  cruisePort: "1548574505-5e239809ee19",
  cruiseShip: "1599640842225-85d111c60e6b",
  dubai: "1512453979798-5ea266f8880c",
  maldives: "1514282401047-d79a71a590e8",
  beach: "1507525428034-b723cf961d3e",
  wing: "1436491865332-7a61a109cc05",
  wingSunset: "1500835556837-99ac94a94552",
  planning: "1488646953014-85cb44e25828",
  lounge: "1530521954074-e64f6810b32d",
  resort: "1540541338287-41700207dee6",
} as const;

export type PhotoKey = keyof typeof photos;

export function photoUrl(key: PhotoKey, width = 1600) {
  return `https://images.unsplash.com/photo-${photos[key]}?auto=format&fit=crop&q=72&w=${width}`;
}

// Customer photos from My Trip World's own tours, stored in /public/gallery.
const places = [
  "Kuala Lumpur, Malaysia",
  "Batu Caves, Malaysia",
  "Ho Chi Minh City, Vietnam",
  "Alila Fort Bishangarh",
  "Singapore",
  "Bali, Indonesia",
  "Almaty, Kazakhstan",
  "Kazakhstan",
  "Vietnam",
  "Vietnam",
];
export const customerPhotos = places.map((place, i) => ({
  src: `/gallery/traveller-${String(i + 1).padStart(2, "0")}.jpg`,
  place,
}));
