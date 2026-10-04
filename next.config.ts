import type { NextConfig } from "next";

// Static export: `next build` writes plain HTML/CSS/JS to `out/`,
// which can be hosted for free on Cloudflare Pages (or any static host).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
