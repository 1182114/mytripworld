import type { PhotoKey } from "./images";

export type TourPackage = {
  slug: string;
  kind: "tour" | "cruise";
  title: string;
  kicker: string;
  places: string;
  duration?: string;
  price?: string;
  wasPrice?: string;
  badge?: string;
  cover: PhotoKey;
  gallery: PhotoKey[];
  summary: string;
  includes: string[];
  // Indicative only — the client must confirm these before launch.
  highlights: { place: string; text: string }[];
};

export const packages: TourPackage[] = [
  {
    slug: "one-trip-5-countries",
    kind: "tour",
    title: "One Trip, Five Countries",
    kicker: "Most popular · Best seller",
    places: "Singapore · Cambodia · Vietnam · Malaysia · Thailand",
    duration: "13 Nights / 14 Days",
    price: "₹99,999",
    wasPrice: "₹2,50,000",
    badge: "Best seller",
    cover: "singapore",
    gallery: ["petronas", "goldenBridge", "thailand", "merlion"],
    summary:
      "Our signature South-East Asia circuit: five countries in a single, well-paced fortnight, with every flight, hotel and transfer arranged for you.",
    includes: [
      "4 international flights",
      "13 nights' stay with daily breakfast",
      "12 airport pick-up and drop transfers",
      "Guided sightseeing in every country",
    ],
    highlights: [
      { place: "Singapore", text: "Marina Bay, the Merlion and an evening on Sentosa." },
      { place: "Malaysia", text: "Kuala Lumpur's Petronas Towers, Batu Caves and Genting Highlands." },
      { place: "Thailand", text: "Temples, floating markets and island-hopping by longtail boat." },
      { place: "Cambodia", text: "Sunrise over the temples of Angkor." },
      { place: "Vietnam", text: "Ho Chi Minh City's streets, cafés and river life." },
    ],
  },
  {
    slug: "one-trip-3-countries",
    kind: "tour",
    title: "One Trip, Three Countries",
    kicker: "A week, three stamps",
    places: "Singapore · Malaysia · Phuket",
    duration: "7 Nights / 8 Days",
    price: "₹89,999",
    wasPrice: "₹1,50,000",
    cover: "petronas",
    gallery: ["merlion", "thailand", "thaiLake", "singapore"],
    summary:
      "City lights, hill stations and beach time in one tidy week — ideal for families and first-time international travellers.",
    includes: [
      "3 international flights",
      "7 nights' stay with daily breakfast",
      "8 airport pick-up and drop transfers",
      "Guided sightseeing in every country",
    ],
    highlights: [
      { place: "Singapore", text: "Gardens by the Bay, Marina Bay and Sentosa." },
      { place: "Malaysia", text: "Kuala Lumpur city tour, Petronas Towers and Batu Caves." },
      { place: "Phuket", text: "Beaches, island day trips and Andaman sunsets." },
    ],
  },
  {
    slug: "australia-new-zealand",
    kind: "tour",
    title: "Australia & New Zealand",
    kicker: "The grand southern journey",
    places: "Australia · New Zealand",
    duration: "11 Nights / 12 Days",
    price: "₹3,49,999",
    wasPrice: "₹6,00,000",
    badge: "Includes cruising",
    cover: "sydney",
    gallery: ["skylineDusk", "cruiseShip", "beach", "wingSunset"],
    summary:
      "Harbour cities, dramatic coastlines and time at sea — a fully catered journey across two countries with all meals taken care of.",
    includes: [
      "2 international flights",
      "11 nights' stay with all meals",
      "4 airport pick-up and drop transfers",
      "Cruising included",
    ],
    highlights: [
      { place: "Australia", text: "Sydney Harbour, the Opera House and the coast beyond." },
      { place: "At sea", text: "Days on board with dining and entertainment included." },
      { place: "New Zealand", text: "Harbour cities and the landscapes the country is famous for." },
    ],
  },
  {
    slug: "explore-vietnam",
    kind: "tour",
    title: "Explore Vietnam",
    kicker: "City energy, island calm",
    places: "Ho Chi Minh City · Phu Quoc",
    cover: "halong",
    gallery: ["saigon", "goldenBridge", "beach", "resort"],
    summary:
      "Pair the buzz of Ho Chi Minh City with the white-sand beaches of Phu Quoc. Tell us your dates and we will tailor the stay to your group.",
    includes: [
      "International flights",
      "Hotel stay with breakfast",
      "Airport pick-up and drop transfers",
      "Sightseeing with local guides",
    ],
    highlights: [
      { place: "Ho Chi Minh City", text: "Markets, colonial landmarks and the best street food in the country." },
      { place: "Phu Quoc", text: "Island beaches, cable-car views and slow evenings by the sea." },
    ],
  },
  {
    slug: "norwegian-cruise",
    kind: "cruise",
    title: "Norwegian Cruise Line Holidays",
    kicker: "Cruise holidays",
    places: "Sailings across Asia, Europe and beyond",
    badge: "Cruise",
    cover: "cruiseShip",
    gallery: ["cruisePort", "maldives", "resort", "beach"],
    summary:
      "Unpack once and wake up somewhere new every morning. We book the cabin, flights, visas and shore excursions as one package.",
    includes: [
      "Cabin of your choice",
      "Meals and entertainment on board",
      "Flights and port transfers arranged",
      "Visa and shore-excursion assistance",
    ],
    highlights: [
      { place: "On board", text: "Restaurants, shows, pools and activities for every age." },
      { place: "In port", text: "Guided shore excursions at each stop, planned around your interests." },
    ],
  },
];

export const tours = packages.filter((p) => p.kind === "tour");
export const cruises = packages.filter((p) => p.kind === "cruise");

export function getPackage(slug: string) {
  return packages.find((p) => p.slug === slug);
}

export const reviews = [
  {
    name: "Mr. Narinder Singh",
    trip: "Malaysia tour",
    text: "Our Malaysia tour through My Trip World was well organised and relaxing. Hotel arrangements, local transport and sightseeing were perfectly coordinated. We especially enjoyed the Petronas Towers, Batu Caves and Genting Highlands. The team stayed connected and solved every query on time.",
  },
  {
    name: "Dr. Poonam",
    trip: "Group tour",
    text: "Our experience with My Trip World was excellent overall. We enjoyed a lot, and everything was very well managed and organised. The sense of belonging we felt with your team can't be found anywhere else. Thanks a lot for your efforts.",
  },
];
