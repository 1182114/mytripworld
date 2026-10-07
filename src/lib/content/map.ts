import manifest from "@/lib/gallery-manifest.json";
import { sanityDataset, sanityProject, type RawDoc } from "./source";
import type { City, Content, Destination, Faq, GalleryItem, Home, Img, LegalPage, Offer, Package, PageContent, PageKey, Point, Rich, Settings, Testimonial } from "./types";

type Obj = Record<string, unknown>;
const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);
const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : undefined);
const arr = <T = unknown>(v: unknown) => (Array.isArray(v) ? (v as T[]) : []);
const strings = (v: unknown) => arr(v).map(str).filter((s): s is string => Boolean(s));
const byOrder = (a: RawDoc, b: RawDoc) => (num(a.order) ?? 1000) - (num(b.order) ?? 1000) || a._id.localeCompare(b._id);
const rupees = (n?: number) => (n === undefined ? undefined : `₹${n.toLocaleString("en-IN")}`);
const longDate = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function need<T>(value: T | undefined, what: string): T {
  if (value === undefined || value === null || value === "") throw new Error(`Content problem: ${what} is missing. Fill it in the admin panel and publish.`);
  return value;
}

/** Sanity image field (or seed-file image) → the Img shape the site renders. */
function image(v: unknown, what: string, fallbackAlt = ""): Img | undefined {
  if (!v || typeof v !== "object") return undefined;
  const o = v as Obj;
  const alt = str(o.alt) ?? fallbackAlt;

  const local = str(o._sanityAsset);
  if (local) {
    const src = local.replace(/^image@file:\/\/\{\{ROOT\}\}\/public/, "");
    const dims = (manifest as Record<string, { width: number; height: number }>)[src.split("/").pop()!.replace(/\.\w+$/, "")];
    return { src, alt, width: dims?.width, height: dims?.height, cdn: false };
  }

  const ref = str((o.asset as Obj | undefined)?._ref);
  if (!ref) return undefined;
  const m = /^image-([a-f0-9]+)-(\d+)x(\d+)-(\w+)$/.exec(ref);
  if (!m) throw new Error(`Content problem: ${what} has an unreadable image reference (${ref}).`);
  const hotspot = o.hotspot as { x?: number; y?: number } | undefined;
  return {
    src: `https://cdn.sanity.io/images/${sanityProject}/${sanityDataset}/${m[1]}-${m[2]}x${m[3]}.${m[4]}`,
    alt,
    width: Number(m[2]),
    height: Number(m[3]),
    focus: hotspot && typeof hotspot.x === "number" && typeof hotspot.y === "number" ? `${Math.round(hotspot.x * 100)}% ${Math.round(hotspot.y * 100)}%` : undefined,
    cdn: true,
  };
}
const images = (v: unknown, what: string) => arr(v).map((x) => image(x, what)).filter((x): x is Img => Boolean(x));

const faqList = (v: unknown): Faq[] =>
  arr<Obj>(v)
    .map((f) => ({ q: str(f.question), a: str(f.answer) }))
    .filter((f): f is Faq => Boolean(f.q && f.a));

const points = (v: unknown): Point[] =>
  arr<Obj>(v)
    .map((p) => ({ icon: str(p.icon), value: str(p.value), title: str(p.title) ?? "", text: str(p.text) }))
    .filter((p) => p.title);

function rich(v: unknown): Rich {
  return arr<Obj>(v)
    .filter((b) => b._type === "block")
    .map((b) => {
      const defs = new Map(arr<Obj>(b.markDefs).map((d) => [d._key as string, str(d.href)]));
      return {
        style: b.style === "h2" ? ("h2" as const) : ("normal" as const),
        list: b.listItem === "bullet" || undefined,
        spans: arr<Obj>(b.children).map((c) => {
          const marks = arr<string>(c.marks);
          return { text: String(c.text ?? ""), bold: marks.includes("strong") || undefined, href: marks.map((mk) => defs.get(mk)).find(Boolean) };
        }),
      };
    });
}

const seo = (doc: RawDoc, title: string, description: string) => {
  const s = (doc.seo ?? {}) as Obj;
  return { seoTitle: str(s.title) ?? title, seoDescription: str(s.description) ?? description };
};

export function mapContent(docs: RawDoc[]): Content {
  const of = (type: string) => docs.filter((d) => d._type === type && !d._id.startsWith("drafts."));
  const one = (id: string, label: string) => need(docs.find((d) => d._id === id), label);

  // ---- settings
  const s = one("siteSettings", "Site settings");
  const phone = need(str(s.phone), "Site settings → Main phone number");
  const telHref = (n: string) => `tel:${n.replace(/[^+\d]/g, "")}`;
  const social = (s.social ?? {}) as Obj;
  const rating = (s.justdialRating ?? {}) as Obj;
  const settings: Settings = {
    name: need(str(s.companyName), "Site settings → Company name"),
    tagline: str(s.tagline),
    parent: str(s.parentCompany),
    legalName: str(s.legalName),
    founded: num(s.foundedYear),
    logo: need(image(s.logo, "Site settings → Logo"), "Site settings → Logo"),
    footerText: str(s.footerText),
    phone,
    phoneHref: telHref(phone),
    phoneNote: str(s.phoneNote),
    phones: [phone, ...strings(s.morePhones)].map((n) => ({ label: n, href: telHref(n) })),
    whatsapp: need(str(s.whatsapp), "Site settings → WhatsApp number"),
    email: need(str(s.email), "Site settings → Main email"),
    complaintsEmail: str(s.complaintsEmail),
    workingHours: str(s.workingHours),
    offices: arr<Obj>(s.offices).map((o) => ({ city: str(o.city) ?? "", street: str(o.street) ?? "", region: str(o.region) ?? "", postalCode: str(o.postalCode), mapUrl: str(o.mapUrl) })),
    social: Object.fromEntries(["facebook", "instagram", "youtube", "googleBusiness", "justdial", "tripadvisor"].map((k) => [k, str(social[k])]).filter(([, v]) => v)),
    justdialRating: num(rating.score) && num(rating.count) ? { score: num(rating.score)!, count: num(rating.count)! } : undefined,
    uspLabel: str(s.uspLabel) ?? "Included with every package",
    usps: arr<Obj>(s.usps).map((u) => ({ icon: str(u.icon) ?? "car", title: str(u.title) ?? "", text: str(u.text) ?? "" })).filter((u) => u.title),
    uspChip: str(s.uspChip),
    seoTitle: need(str(s.seoTitle), "Site settings → Home page search title"),
    seoDescription: need(str(s.seoDescription), "Site settings → Home page search description"),
    longDescription: need(str(s.longDescription), "Site settings → Company description"),
    shareImage: image(s.shareImage, "Site settings → Share photo"),
    areaServed: strings(s.areaServed),
  };

  // ---- home
  const h = one("homePage", "Home page");
  const home: Home = {
    eyebrow: str(h.eyebrow),
    heading: need(str(h.heading), "Home page → Main heading"),
    headingHighlight: str(h.headingHighlight),
    intro: need(str(h.intro), "Home page → Line under the heading"),
    heroImage: need(image(h.heroImage, "Home page → Background photo"), "Home page → Background photo"),
    stats: points(h.stats),
    packagesEyebrow: str(h.packagesEyebrow),
    packagesHeading: str(h.packagesHeading) ?? "Tour Packages",
    packagesIntro: str(h.packagesIntro),
    whyHeading: str(h.whyHeading) ?? `Why Choose ${settings.name}`,
    whyPoints: points(h.whyPoints),
    aboutEyebrow: str(h.aboutEyebrow),
    aboutHeading: str(h.aboutHeading),
    aboutBody: rich(h.aboutBody),
    cruiseEyebrow: str(h.cruiseEyebrow),
    cruiseHeading: str(h.cruiseHeading),
    cruiseText: str(h.cruiseText),
    cruiseImage: image(h.cruiseImage, "Home page → Cruise banner photo"),
    ctaHeading: str(h.ctaHeading) ?? "Let’s plan your next trip.",
    ctaImage: image(h.ctaImage, "Home page → Closing banner photo"),
  };

  // ---- fixed pages
  const keys: PageKey[] = ["about", "tourPackages", "cruise", "gallery", "contact", "india", "departureCities"];
  const pages = Object.fromEntries(
    keys.map((key) => {
      const d = one(`page-${key}`, `Pages → ${key}`);
      const heading = need(str(d.heading), `Pages → ${key} → Main heading`);
      const page: PageContent = {
        key,
        eyebrow: str(d.eyebrow),
        heading,
        intro: str(d.intro),
        heroImage: image(d.heroImage, `Pages → ${key} → Top photo`),
        bodyHeading: str(d.bodyHeading),
        body: strings(d.body),
        bullets: strings(d.bullets),
        cardsHeading: str(d.cardsHeading),
        cards: points(d.cards),
        photos: images(d.photos, `Pages → ${key} → Photos`),
        faqs: faqList(d.faqs),
        ...seo(d, heading, str(d.intro) ?? settings.seoDescription),
      };
      return [key, page];
    }),
  ) as Record<PageKey, PageContent>;

  const legal: LegalPage[] = of("legalPage").map((d) => ({
    slug: need(str((d.slug as Obj | undefined)?.current), `Legal page ${d._id} → Web address`),
    title: need(str(d.title), `Legal page ${d._id} → Title`),
    description: str(d.description) ?? "",
    body: rich(d.body),
  }));

  // ---- packages
  const today = new Date().toISOString().slice(0, 10);
  const seenSlugs = new Set<string>();
  const packages: Package[] = of("package")
    .sort(byOrder)
    .map((d) => {
      const title = need(str(d.title), `Package ${d._id} → Package name`);
      const slug = need(str((d.slug as Obj | undefined)?.current), `Package "${title}" → Web address`);
      if (seenSlugs.has(slug)) throw new Error(`Content problem: two packages use the web address "${slug}". Each package needs its own.`);
      seenSlugs.add(slug);
      const places = strings(d.places);
      const nights = num(d.nights);
      const days = num(d.days);
      const price = num(d.price);
      const terms = (d.priceTerms ?? {}) as Obj;
      const validTill = str(terms.validTill);
      const priceTerms = [str(terms.basis), str(terms.sharing), str(terms.note), validTill ? `valid till ${longDate(validTill)}` : undefined].filter(Boolean).join(" · ") || undefined;
      const summary = need(str(d.summary), `Package "${title}" → Short description`);
      const cover = need(image(d.cover, `Package "${title}" → Main photo`, title), `Package "${title}" → Main photo`);
      const kind = d.kind === "cruise" || d.kind === "inbound" ? d.kind : "tour";
      const stops = arr<Obj>(d.stops)
        .map((x) => ({ name: str(x.name) ?? "", country: str(x.country), nights: num(x.nights), image: image(x.image, `Package "${title}" → Destination photo`, str(x.name) ?? ""), summary: str(x.summary), experiences: strings(x.experiences) }))
        .filter((x) => x.name);
      const countries = num(d.countriesCount) ?? (new Set(stops.map((x) => x.country).filter(Boolean)).size || undefined);
      const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);
      const facts = [
        countries !== undefined && { icon: "globe", value: String(countries), label: plural(countries, "Country", "Countries") },
        stops.length > 0 && { icon: "pin", value: String(stops.length), label: plural(stops.length, "Destination", "Destinations") },
        nights !== undefined && { icon: "moon", value: String(nights), label: plural(nights, "Night", "Nights") },
        num(d.internationalFlights) !== undefined && { icon: "plane", value: String(num(d.internationalFlights)), label: plural(num(d.internationalFlights)!, "International Flight", "International Flights") },
        num(d.domesticFlights) !== undefined && { icon: "plane", value: String(num(d.domesticFlights)), label: plural(num(d.domesticFlights)!, "Domestic Flight", "Domestic Flights") },
      ].filter((f): f is { icon: string; value: string; label: string } => Boolean(f));
      return {
        slug,
        kind,
        title,
        kicker: str(d.kicker),
        places,
        placesLabel: places.join(" · "),
        nights,
        days,
        duration: str(d.durationText) ?? (nights !== undefined ? (days !== undefined ? `${nights} Nights / ${days} Days` : `${nights} ${nights === 1 ? "Night" : "Nights"}`) : undefined),
        departureAirports: strings(d.departureAirports),
        price,
        priceLabel: rupees(price),
        wasPriceLabel: rupees(num(d.wasPrice)),
        priceTerms,
        badge: str(d.badge),
        summary,
        tagline: str(d.tagline),
        overview: strings(d.overview).length ? strings(d.overview) : [summary],
        ctaHeading: str(d.ctaHeading),
        addOns: str(d.addOns),
        itineraryHeading: str(d.itineraryHeading),
        moreInfo: arr<Obj>(d.moreInfo).map((x) => ({ title: str(x.title) ?? "", items: strings(x.items) })).filter((x) => x.title && x.items.length),
        ctaText: str(d.ctaText),
        includes: strings(d.includes),
        excludes: strings(d.excludes),
        highlights: arr<Obj>(d.highlights).map((x) => ({ place: str(x.place) ?? "", text: str(x.text) ?? "" })).filter((x) => x.place),
        itinerary: arr<Obj>(d.itinerary)
          .map((x) => ({ day: num(x.day) ?? 0, title: str(x.title) ?? "", description: str(x.description), overnight: str(x.overnight), hotel: str(x.hotel) }))
          .filter((x) => x.title)
          .sort((a, b) => a.day - b.day),
        departures: arr<Obj>(d.departures)
          .map((x) => ({ date: str(x.date) ?? "", seatsLeft: num(x.seatsLeft), note: str(x.note) }))
          .filter((x) => x.date && x.date >= today)
          .sort((a, b) => a.date.localeCompare(b.date))
          .map((x) => ({ ...x, label: longDate(x.date) })),
        faqs: faqList(d.faqs),
        cover,
        gallery: images(d.gallery, `Package "${title}" → More photos`),
        ...seo(d, title, summary.slice(0, 160)),
        facts,
        stops,
        highlightPoints: strings(d.highlightPoints),
        paymentPolicy: strings(d.paymentPolicy),
        visaInfo: strings(d.visaInfo),
        importantInfo: strings(d.importantInfo),
        terms: strings(d.terms),
        featured: d.featured === true,
      };
    });
  if (!packages.length) throw new Error("Content problem: there are no published packages. Publish at least one package in the admin panel.");

  const destinations: Destination[] = of("destination")
    .sort(byOrder)
    .map((d) => {
      const name = need(str(d.name), `Destination ${d._id} → Name`);
      return {
        slug: need(str((d.slug as Obj | undefined)?.current), `Destination "${name}" → Web address`),
        name,
        image: need(image(d.image, `Destination "${name}" → Photo`, name), `Destination "${name}" → Photo`),
        showOnHome: d.showOnHome !== false,
        tileSize: d.tileSize === "wide" || d.tileSize === "large" ? d.tileSize : "normal",
        intro: strings(d.intro),
        ...seo(d, `${name} Tour Packages from India`, `${name} tour packages from India by ${settings.name}, with flights, stay, transfers and sightseeing.`),
      };
    });

  const cities: City[] = of("city")
    .sort(byOrder)
    .map((d) => {
      const name = need(str(d.name), `Departure city ${d._id} → City name`);
      const code = need(str(d.code), `Departure city "${name}" → Airport code`);
      const hasPage = d.hasPage !== false;
      if (hasPage && !strings(d.intro).length) throw new Error(`Content problem: departure city "${name}" has its own page but no introduction. Write one, or switch off "Give this city its own page".`);
      return {
        slug: need(str((d.slug as Obj | undefined)?.current), `Departure city "${name}" → Web address`),
        name,
        short: str(d.shortName) ?? name,
        airport: need(str(d.airport), `Departure city "${name}" → Airport name`),
        code,
        area: str(d.area) ?? name,
        intro: strings(d.intro),
        notes: strings(d.notes),
        state: str(d.state),
        officeAnswer: hasPage ? need(str(d.officeAnswer), `Departure city "${name}" → Office answer`) : (str(d.officeAnswer) ?? ""),
        faqs: faqList(d.faqs),
        featured: d.featured === true,
        hasPage,
        ...seo(d, `International Tour Packages from ${name}`, `International tour packages from ${name}: Singapore, Thailand, Vietnam, Australia and more. Flights from ${code}, stay, transfers and sightseeing in one price.`),
      };
    });

  // Sort order first (to pin favourites), then newest first.
  const testimonials: Testimonial[] = of("testimonial")
    .sort((a, b) => (num(a.order) ?? 100) - (num(b.order) ?? 100) || (str(b.date) ?? String(b._createdAt ?? "")).localeCompare(str(a.date) ?? String(a._createdAt ?? "")))
    .map((d) => ({ name: str(d.name) ?? "", trip: str(d.trip), text: str(d.text) ?? "", rating: num(d.rating), source: str(d.source), photo: image(d.photo, `Review by ${str(d.name)}`) }))
    .filter((t) => t.name && t.text);

  const gallery: GalleryItem[] = of("galleryItem")
    .sort(byOrder)
    .map((d) => ({ image: image(d.image, `Gallery photo ${d._id}`), place: str(d.place) ?? "" }))
    .filter((g): g is GalleryItem => Boolean(g.image));

  const faqs: Faq[] = of("faq")
    .sort(byOrder)
    .map((d) => ({ q: str(d.question), a: str(d.answer) }))
    .filter((f): f is Faq => Boolean(f.q && f.a));

  const offers: Offer[] = of("offer")
    .sort(byOrder)
    .filter((d) => d.active !== false && (str(d.validTill) ?? "") >= today)
    .map((d) => {
      const ref = str((d.package as Obj | undefined)?._ref);
      const pkgDoc = ref ? docs.find((x) => x._id === ref) : undefined;
      const pkgSlug = str((pkgDoc?.slug as Obj | undefined)?.current);
      return { title: str(d.title) ?? "", text: str(d.text) ?? "", validTill: str(d.validTill)!, validLabel: longDate(str(d.validTill)!), packageSlug: pkgSlug, packageTitle: str(pkgDoc?.title) };
    })
    .filter((o) => o.title);

  return {
    settings,
    contact: { name: settings.name, phone: settings.phone, phoneHref: settings.phoneHref, whatsapp: settings.whatsapp, email: settings.email },
    home,
    pages,
    legal,
    packages,
    destinations,
    cities,
    testimonials,
    gallery,
    faqs,
    offers,
  };
}
