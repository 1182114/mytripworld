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
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "International Tour Packages from India | My Trip World",
    description: site.description,
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
  "@type": "TravelAgency",
  name: site.name,
  url: site.url,
  description: site.description,
  telephone: "+91-97280-24440",
  logo: `${site.url}/logo.png`,
  image: `${site.url}/hero.jpg`,
  priceRange: "₹₹",
  areaServed: "IN",
  email: site.email,
  sameAs: [site.social.facebook],
  address: site.offices.map((o) => ({
    "@type": "PostalAddress",
    streetAddress: o.lines.slice(0, 2).join(", "),
    addressLocality: o.city,
    addressRegion: "Haryana",
    addressCountry: "IN",
  })),
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
