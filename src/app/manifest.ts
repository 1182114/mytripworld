import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";

export const dynamic = "force-static";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { settings } = await getContent();
  return {
    name: settings.name,
    short_name: "MyTripWorld",
    description: settings.seoDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2e3d6e",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
