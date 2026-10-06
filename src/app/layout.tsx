import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { site } from "@/lib/site";
import "./globals.css";

// Cormorant Garamond for main headings; Manrope for body text, navigation,
// buttons and labels.
const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const sans = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "International Tour Packages from India | My Trip World",
    template: "%s | My Trip World",
  },
  description: site.metaDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "International Tour Packages from India | My Trip World",
    description: site.metaDescription,
    url: site.url,
    images: [{ url: "/hero.jpg", width: 1672, height: 941, alt: "A yacht in a turquoise tropical lagoon at golden hour" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = { themeColor: "#2e3d6e" };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      legalName: "S.C.R Infotech Pvt. Ltd.",
      url: site.url,
      logo: { "@type": "ImageObject", url: `${site.url}/logo.png`, width: 800, height: 213 },
      foundingDate: site.founded,
      email: site.email,
      sameAs: [site.social.facebook, site.social.justdial],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-97280-24440",
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["en", "hi"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": `${site.url}/#organization` },
      inLanguage: "en-IN",
    },
    ...site.offices.map((o) => ({
      "@type": "TravelAgency",
      "@id": `${site.url}/#office-${o.city.toLowerCase()}`,
      name: `${site.name} — ${o.city}`,
      parentOrganization: { "@id": `${site.url}/#organization` },
      url: site.url,
      description: site.description,
      image: `${site.url}/hero.jpg`,
      logo: `${site.url}/logo.png`,
      telephone: "+91-97280-24440",
      email: site.email,
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: o.lines.slice(0, 2).join(", "),
        addressLocality: o.city,
        addressRegion: "Haryana",
        postalCode: o.lines[2]?.match(/\d{6}/)?.[0],
        addressCountry: "IN",
      },
      areaServed: site.areaServed.map((name) => ({ "@type": name === "India" ? "Country" : "Place", name })),
      sameAs: [site.social.facebook, site.social.justdial],
    })),
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFab />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
