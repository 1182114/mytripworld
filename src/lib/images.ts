// Destination photography (free-licence stock from Unsplash), stored locally
// in /public/photos as <name>.jpg (1600px) and <name>-800.jpg.
// To swap a photo, replace both files and keep the same name.
export const photoNames = [
  "singapore",
  "merlion",
  "baliTemple",
  "baliRice",
  "halong",
  "saigon",
  "goldenBridge",
  "thailand",
  "thaiLake",
  "petronas",
  "sydney",
  "skylineDusk",
  "cruisePort",
  "cruiseShip",
  "dubai",
  "maldives",
  "beach",
  "wing",
  "wingSunset",
  "planning",
  "resort",
] as const;

export type PhotoKey = (typeof photoNames)[number];

export function photoUrl(key: PhotoKey, width = 1600) {
  return `/photos/${key}${width <= 800 ? "-800" : ""}.jpg`;
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
