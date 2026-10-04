export const site = {
  name: "My Trip World",
  tagline: "A Perfect Holiday Maker's",
  url: "https://mytripworld.net",
  parent: "A division of S.C.R Infotech Pvt. Ltd.",
  description:
    "My Trip World plans international tour packages and cruise holidays for travellers from India, and India tours for visitors from abroad — group, individual and corporate, with flights, stays, transfers and sightseeing in one price.",
  phoneDisplay: "+91 97280-24440",
  phoneHref: "tel:+919728024440",
  phoneAlt: "Also on 97280-24441 to 24448",
  whatsapp: "919728024440",
  email: "info@mytripworld.net",
  complaintsEmail: "contact@mytripworld.net",
  social: {
    facebook: "https://www.facebook.com/itworldonlinecomputereducationacademy/",
    justdial: "https://www.justdial.com/Jind/My-Trip-World-Near-Dav-School-Hanuman-Nagar/9999P1681-1681-230918113716-R4F8_BZDET",
  },
  // Public rating on Justdial, checked 4 Oct 2026. Update when it changes.
  justdialRating: { score: "4.4", count: 11 },
  offices: [
    {
      city: "Gurugram",
      lines: [
        "Office No. 101, 1st Floor, Dhanwapur Road",
        "Near Sector 4/5 Chowk",
        "Gurugram, Haryana 122001",
      ],
    },
    {
      city: "Narwana",
      lines: [
        "Gali No. 05, Pritam Bagh, Opp. Bus Stand",
        "Hanuman Nagar, Near DAV School",
        "Narwana, Haryana 126116",
      ],
    },
  ],
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about-us/", label: "About" },
  { href: "/tour-packages/", label: "Tour Packages" },
  { href: "/cruise-holidays/", label: "Cruises" },
  { href: "/gallery/", label: "Gallery" },
  { href: "/contact/", label: "Contact" },
];

export function whatsappLink(message?: string) {
  const text = message ?? "Hello My Trip World, I would like to plan a trip.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
