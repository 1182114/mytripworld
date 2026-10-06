import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

// Search engines and AI assistants are all welcome to read the site.
const aiCrawlers = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Bingbot", "CCBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }, ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" }))],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
