// Departure-city landing pages. Offices are ONLY in Gurugram and Narwana —
// these pages describe how a trip works from each city, not a local branch.
// Flight times are approximate non-stop flying times and can change by airline.
export type City = {
  slug: string;
  name: string;
  short: string;
  airport: string;
  code: string;
  area: string;
  intro: string[];
  notes: string[];
  officeAnswer: string;
};

const noOffice = (city: string) =>
  `No. Our offices are in Gurugram and Narwana, Haryana. Travellers from ${city} plan and book with us by phone, WhatsApp and email, and receive all tickets and vouchers digitally.`;

export const cities: City[] = [
  {
    slug: "international-tour-packages-from-delhi",
    name: "Delhi NCR",
    short: "Delhi",
    airport: "Indira Gandhi International Airport",
    code: "DEL",
    area: "Delhi, Gurugram, Noida, Faridabad and Ghaziabad",
    intro: [
      "Delhi NCR is home ground for My Trip World. Our head office is in Gurugram, a short drive from Indira Gandhi International Airport, so travellers from Delhi, Noida, Faridabad and Ghaziabad can plan a trip in person or over a call.",
      "International flights from Delhi leave from Terminal 3, which has regular services to Singapore, Bangkok and Kuala Lumpur — the usual gateways for our South-East Asia packages — as well as onward connections to Australia and New Zealand.",
    ],
    notes: [
      "Non-stop flying time is about 5 hours 45 minutes to Singapore and about 4 hours 15 minutes to Bangkok.",
      "You can meet our team at the Gurugram office before you book.",
      "Winter fog can affect early-morning departures from Delhi between December and January, so it is worth allowing extra time.",
    ],
    officeAnswer:
      "Yes. Our head office is at Office No. 101, 1st Floor, Dhanwapur Road, near Sector 4/5 Chowk, Gurugram, Haryana 122001 — within Delhi NCR.",
  },
  {
    slug: "international-tour-packages-from-mumbai",
    name: "Mumbai",
    short: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    code: "BOM",
    area: "Mumbai, Navi Mumbai and Thane",
    intro: [
      "Mumbai is one of India's busiest international gateways, and a natural starting point for South-East Asia, Australia and cruise holidays. International flights use Terminal 2 of Chhatrapati Shivaji Maharaj International Airport.",
      "Travellers from Mumbai, Navi Mumbai and Thane book with My Trip World by phone, WhatsApp and email. We arrange flights from Mumbai, hotels, sightseeing and transfers as a single package.",
    ],
    notes: [
      "Non-stop flying time is about 5 hours 30 minutes to Singapore and about 4 hours 30 minutes to Bangkok.",
      "Mumbai is also a convenient departure point for fly-cruise holidays.",
      "The monsoon months of June to September can mean longer drives to the airport, so allow extra time for your pick-up.",
    ],
    officeAnswer: noOffice("Mumbai"),
  },
  {
    slug: "international-tour-packages-from-bangalore",
    name: "Bengaluru",
    short: "Bangalore",
    airport: "Kempegowda International Airport",
    code: "BLR",
    area: "Bengaluru and nearby Karnataka cities",
    intro: [
      "From Bengaluru, South-East Asia is closer than most travellers expect. Kempegowda International Airport at Devanahalli has services to Singapore, Bangkok and Kuala Lumpur, which makes our three-country and five-country circuits an easy fit.",
      "The airport sits well north of the city, so a planned pick-up matters here more than in most metros. My Trip World builds the transfer into your package.",
    ],
    notes: [
      "Non-stop flying time is about 4 hours 30 minutes to Singapore and about 3 hours 45 minutes to Bangkok.",
      "Kempegowda International Airport is roughly 35 km from central Bengaluru — allow for traffic on the way.",
      "Corporate groups from Bengaluru can ask for a tailor-made offsite or incentive trip.",
    ],
    officeAnswer: noOffice("Bengaluru"),
  },
  {
    slug: "international-tour-packages-from-kolkata",
    name: "Kolkata",
    short: "Kolkata",
    airport: "Netaji Subhas Chandra Bose International Airport",
    code: "CCU",
    area: "Kolkata and eastern India",
    intro: [
      "Kolkata is the closest Indian metro to South-East Asia. From Netaji Subhas Chandra Bose International Airport at Dum Dum, Bangkok is a short flight away, which keeps travel days short on Thailand, Vietnam and Cambodia itineraries.",
      "Travellers from Kolkata and the rest of eastern India book with My Trip World remotely — by phone, WhatsApp and email — and travel on the same packages and offer prices shown on this site.",
    ],
    notes: [
      "Non-stop flying time is about 2 hours 30 minutes to Bangkok and about 4 hours 15 minutes to Singapore.",
      "A shorter flight means more usable time at the destination on a week-long trip.",
      "Durga Puja and winter holidays are busy travel periods from Kolkata — early booking helps with seats.",
    ],
    officeAnswer: noOffice("Kolkata"),
  },
  {
    slug: "international-tour-packages-from-chennai",
    name: "Chennai",
    short: "Chennai",
    airport: "Chennai International Airport",
    code: "MAA",
    area: "Chennai and Tamil Nadu",
    intro: [
      "Chennai is well connected with Singapore and Malaysia. From Chennai International Airport, Singapore and Kuala Lumpur are both around four hours away, so our Singapore–Malaysia circuits start with a short, simple flight.",
      "My Trip World plans trips for travellers from Chennai and across Tamil Nadu by phone, WhatsApp and email, with flights from Chennai, stays, transfers and sightseeing arranged together.",
    ],
    notes: [
      "Non-stop flying time is about 4 hours 15 minutes to Singapore and about 4 hours to Kuala Lumpur.",
      "Singapore and Malaysia are natural first stops when flying from Chennai.",
      "The north-east monsoon (October to December) can bring heavy rain to Chennai — allow extra time for the drive to the airport.",
    ],
    officeAnswer: noOffice("Chennai"),
  },
  {
    slug: "international-tour-packages-from-hyderabad",
    name: "Hyderabad",
    short: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    code: "HYD",
    area: "Hyderabad, Secunderabad and Telangana",
    intro: [
      "Hyderabad's Rajiv Gandhi International Airport at Shamshabad connects well with South-East Asia, with services to Singapore, Bangkok and Kuala Lumpur. That makes it a comfortable starting point for our multi-country packages.",
      "Families, groups and companies in Hyderabad and Secunderabad book with My Trip World over phone, WhatsApp and email. We send the itinerary, price and all travel documents digitally.",
    ],
    notes: [
      "Non-stop flying time is about 4 hours 30 minutes to Singapore and about 3 hours 30 minutes to Bangkok.",
      "The airport is south of the city at Shamshabad — your pick-up is planned around the drive.",
      "Company teams can ask for corporate tours with meetings and events built in.",
    ],
    officeAnswer: noOffice("Hyderabad"),
  },
  {
    slug: "international-tour-packages-from-pune",
    name: "Pune",
    short: "Pune",
    airport: "Pune Airport",
    code: "PNQ",
    area: "Pune and Pimpri-Chinchwad",
    intro: [
      "Pune Airport at Lohegaon has a limited number of international routes, so most international holidays from Pune begin with a connection — either a domestic flight to a hub such as Delhi or Mumbai, or a road transfer to Mumbai, about 150 km away.",
      "My Trip World plans that first leg for you. When you enquire, tell us whether you prefer to fly from Pune or drive to Mumbai, and we will build the routing and timings around it.",
    ],
    notes: [
      "Mumbai's international airport is roughly a three-to-four-hour drive from Pune on the expressway.",
      "Flying out of Pune usually means one stop before your international flight.",
      "We match the connection time to your international departure so the journey is not rushed.",
    ],
    officeAnswer: noOffice("Pune"),
  },
  {
    slug: "international-tour-packages-from-ahmedabad",
    name: "Ahmedabad",
    short: "Ahmedabad",
    airport: "Sardar Vallabhbhai Patel International Airport",
    code: "AMD",
    area: "Ahmedabad, Gandhinagar and Gujarat",
    intro: [
      "For travellers from Ahmedabad, Gandhinagar and the rest of Gujarat, flights leave from Sardar Vallabhbhai Patel International Airport; depending on the date and airline, your routing may be direct or through a hub such as Delhi or Mumbai.",
      "My Trip World plans group, family and corporate trips from Gujarat by phone, WhatsApp and email. Tell us your meal preferences when you enquire so we can plan for them.",
    ],
    notes: [
      "Routings from Ahmedabad vary by season — we confirm the exact flights with your quote.",
      "Vegetarian and Jain meal preferences can be noted at the time of enquiry.",
      "Diwali and summer school holidays are peak travel periods from Gujarat, so early booking helps.",
    ],
    officeAnswer: noOffice("Ahmedabad"),
  },
];

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}

export function cityFaqs(city: City) {
  return [
    {
      q: `Which airport will I fly from on a tour from ${city.name}?`,
      a: `Trips from ${city.name} start at ${city.airport} (${city.code}). ${city.notes[0]} The exact flights are confirmed with your quote.`,
    },
    {
      q: `Is airport pick-up and drop included from ${city.name}?`,
      a: `Complimentary home-city to airport pick-up and drop is part of My Trip World packages. Share your address in ${city.short} when you enquire and our team will confirm the arrangement for your trip.`,
    },
    {
      q: `Does My Trip World have an office in ${city.name}?`,
      a: city.officeAnswer,
    },
    {
      q: `What do international tour packages from ${city.name} cost?`,
      a: `Our offer prices are ₹99,999 for One Trip, Five Countries (13 nights / 14 days), ₹89,999 for One Trip, Three Countries (7 nights / 8 days) and ₹3,49,999 for Australia & New Zealand (11 nights / 12 days). The final price for a departure from ${city.short} depends on travel dates and flights, and is confirmed in your quote.`,
    },
  ];
}
