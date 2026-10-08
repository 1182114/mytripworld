import type { NextConfig } from "next";

// Two build modes:
//
// - On Vercel the site runs as a normal Next.js app. Every page is still
//   pre-rendered to static HTML at build time, and the enquiry API
//   (src/app/api/enquiry/route.server.ts) runs as a serverless function.
//
// - Anywhere else (local preview, Cloudflare Pages) `next build` writes a fully
//   static site to `out/`. Files ending in ".server.ts" are left out, so the
//   enquiry form falls back to WhatsApp unless the host provides its own function.
//
// Set STATIC_EXPORT=1 or STATIC_EXPORT=0 to choose a mode explicitly.
const staticExport = process.env.STATIC_EXPORT ? process.env.STATIC_EXPORT === "1" : !process.env.VERCEL;

const nextConfig: NextConfig = {
  output: staticExport ? "export" : undefined,
  pageExtensions: staticExport ? ["tsx", "ts"] : ["server.ts", "tsx", "ts"],
  // Tells the enquiry form whether /api/enquiry exists in this build.
  env: { ENQUIRY_API: process.env.ENQUIRY_API === "1" || !staticExport ? "1" : "" },
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
