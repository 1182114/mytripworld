import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ScrollProgress } from "@/components/ScrollProgress";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { getContent } from "@/lib/content";
import { absoluteImg, imgUrl } from "@/lib/img";
import { siteUrl } from "@/lib/site";
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

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getContent();
  const title = `${settings.seoTitle} | ${settings.name}`;
  const share = settings.shareImage;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s | ${settings.name}` },
    description: settings.seoDescription,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: settings.name,
      title,
      description: settings.seoDescription,
      url: siteUrl,
      images: share ? [{ url: imgUrl(share, 1200), width: share.cdn ? undefined : share.width, height: share.cdn ? undefined : share.height, alt: share.alt }] : undefined,
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
    formatDetection: { telephone: true, email: true, address: true },
  };
}

export const viewport: Viewport = { themeColor: "#2e3d6e" };

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { settings, cities } = await getContent();
  const served = [...new Set([...cities.map((c) => c.name), ...settings.areaServed])];
  const sameAs = Object.values(settings.social).filter(Boolean);
  const logo = absoluteImg(settings.logo, 800);
  const telephone = settings.phoneHref.replace("tel:", "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: settings.name,
        legalName: settings.legalName,
        url: siteUrl,
        logo: { "@type": "ImageObject", url: logo, width: settings.logo.width, height: settings.logo.height },
        foundingDate: settings.founded ? String(settings.founded) : undefined,
        email: settings.email,
        sameAs,
        contactPoint: [{ "@type": "ContactPoint", telephone, contactType: "customer service", areaServed: "IN", availableLanguage: ["en", "hi"] }],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: settings.name,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en-IN",
      },
      ...settings.offices.map((o) => ({
        "@type": "TravelAgency",
        "@id": `${siteUrl}/#office-${o.city.toLowerCase().replace(/\s+/g, "-")}`,
        name: `${settings.name} — ${o.city}`,
        parentOrganization: { "@id": `${siteUrl}/#organization` },
        url: siteUrl,
        description: settings.longDescription,
        image: settings.shareImage ? absoluteImg(settings.shareImage) : undefined,
        logo,
        telephone,
        email: settings.email,
        priceRange: "₹₹",
        hasMap: o.mapUrl,
        address: { "@type": "PostalAddress", streetAddress: o.street, addressLocality: o.city, addressRegion: o.region, postalCode: o.postalCode, addressCountry: "IN" },
        areaServed: served.map((name) => ({ "@type": name === "India" ? "Country" : "Place", name })),
        sameAs,
      })),
    ],
  };

  return (
    <html lang="en" className={`${display.variable} ${sans.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ScrollProgress />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFab />
        <JsonLd data={jsonLd} />
      </body>
    </html>
  );
}
