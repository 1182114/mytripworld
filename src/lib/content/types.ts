export type Img = {
  /** Local path (/photos/x.jpg) or Sanity CDN base URL without size parameters. */
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** Focal point chosen in the admin panel, as CSS object-position. */
  focus?: string;
  cdn: boolean;
};

export type Faq = { q: string; a: string };
export type Point = { icon?: string; value?: string; title: string; text?: string };
export type Usp = { icon: string; title: string; text: string };
export type Office = { city: string; street: string; region: string; postalCode?: string; mapUrl?: string };

export type Settings = {
  name: string;
  tagline?: string;
  parent?: string;
  legalName?: string;
  founded?: number;
  logo: Img;
  footerText?: string;
  phone: string;
  phoneHref: string;
  phoneNote?: string;
  /** Main number first, then any extra numbers from the admin panel. */
  phones: { label: string; href: string }[];
  whatsapp: string;
  email: string;
  complaintsEmail?: string;
  workingHours?: string;
  offices: Office[];
  social: Partial<Record<"facebook" | "instagram" | "youtube" | "googleBusiness" | "justdial" | "tripadvisor", string>>;
  justdialRating?: { score: number; count: number };
  uspLabel: string;
  usps: Usp[];
  uspChip?: string;
  seoTitle: string;
  seoDescription: string;
  longDescription: string;
  shareImage?: Img;
  areaServed: string[];
  welcomePopup?: { image: Img; link: string };
};

/** The contact details client-side components need. */
export type Contact = Pick<Settings, "name" | "phone" | "phoneHref" | "whatsapp" | "email">;

export type Rich = { style: "normal" | "h2"; list?: boolean; spans: { text: string; bold?: boolean; href?: string }[] }[];

export type Home = {
  eyebrow?: string;
  heading: string;
  headingHighlight?: string;
  intro: string;
  heroImage: Img;
  stats: Point[];
  packagesEyebrow?: string;
  packagesHeading: string;
  packagesIntro?: string;
  whyHeading: string;
  whyPoints: Point[];
  aboutEyebrow?: string;
  aboutHeading?: string;
  aboutBody: Rich;
  cruiseEyebrow?: string;
  cruiseHeading?: string;
  cruiseText?: string;
  cruiseImage?: Img;
  ctaHeading: string;
  ctaImage?: Img;
};

export type PageKey = "about" | "tourPackages" | "cruise" | "gallery" | "contact" | "india" | "departureCities";
export type PageContent = {
  key: PageKey;
  eyebrow?: string;
  heading: string;
  intro?: string;
  heroImage?: Img;
  bodyHeading?: string;
  body: string[];
  bullets: string[];
  cardsHeading?: string;
  cards: Point[];
  photos: Img[];
  faqs: Faq[];
  seoTitle: string;
  seoDescription: string;
};

export type LegalPage = { slug: string; title: string; description: string; body: Rich };

export type Package = {
  slug: string;
  kind: "tour" | "cruise" | "inbound";
  title: string;
  kicker?: string;
  places: string[];
  placesLabel: string;
  nights?: number;
  days?: number;
  duration?: string;
  departureAirports: string[];
  price?: number;
  priceLabel?: string;
  wasPriceLabel?: string;
  priceTerms?: string;
  badge?: string;
  summary: string;
  tagline?: string;
  /** Longer "About this journey" text; falls back to the summary. */
  overview: string[];
  ctaHeading?: string;
  addOns?: string;
  itineraryHeading?: string;
  /** Extra fold-away sections, e.g. "Cruise exclusions". */
  moreInfo: { title: string; items: string[] }[];
  ctaText?: string;
  includes: string[];
  excludes: string[];
  highlights: { place: string; text: string }[];
  itinerary: { day: number; title: string; description?: string; overnight?: string; hotel?: string }[];
  departures: { date: string; label: string; seatsLeft?: number; note?: string }[];
  faqs: Faq[];
  cover: Img;
  gallery: Img[];
  seoTitle: string;
  seoDescription: string;
  facts: { icon: string; value: string; label: string }[];
  stops: { name: string; country?: string; nights?: number; image?: Img; summary?: string; experiences: string[] }[];
  highlightPoints: string[];
  paymentPolicy: string[];
  visaInfo: string[];
  importantInfo: string[];
  terms: string[];
  featured: boolean;
};

export type Destination = { slug: string; name: string; image: Img; showOnHome: boolean; tileSize: "normal" | "wide" | "large"; intro: string[]; seoTitle: string; seoDescription: string };
export type City = { slug: string; name: string; short: string; state?: string; airport: string; code: string; area: string; intro: string[]; notes: string[]; officeAnswer: string; faqs: Faq[]; featured: boolean; hasPage: boolean; seoTitle: string; seoDescription: string };
export type Testimonial = { name: string; trip?: string; text: string; rating?: number; source?: string; photo?: Img };
export type GalleryItem = { image: Img; place: string };
export type Offer = { title: string; text: string; validTill: string; validLabel: string; packageSlug?: string; packageTitle?: string };

export type Content = {
  settings: Settings;
  contact: Contact;
  home: Home;
  pages: Record<PageKey, PageContent>;
  legal: LegalPage[];
  packages: Package[];
  destinations: Destination[];
  cities: City[];
  testimonials: Testimonial[];
  gallery: GalleryItem[];
  faqs: Faq[];
  offers: Offer[];
};
