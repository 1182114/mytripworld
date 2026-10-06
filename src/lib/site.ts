// The public address of the live website. Everything else about the company
// (name, phone, offices, packages…) is edited in the admin panel.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://mytripworld.net").replace(/\/$/, "");

/** Where the admin panel (Sanity Studio) lives. */
export const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || "https://mytripworld.sanity.studio";

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about-us/", label: "About" },
  { href: "/tour-packages/", label: "Tour Packages" },
  { href: "/cruise-holidays/", label: "Cruises" },
  { href: "/gallery/", label: "Gallery" },
  { href: "/contact/", label: "Contact" },
];
