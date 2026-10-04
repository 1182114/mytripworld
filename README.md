# My Trip World — website

Static marketing site for My Trip World (mytripworld.net), built with Next.js (static export) and Tailwind CSS.

## Commands

```bash
npm run dev     # local development at http://localhost:3000
npm run build   # writes the finished static site to ./out
```

## Editing content

- Packages, prices and reviews: `src/lib/packages.ts`
- Phone, WhatsApp, email, addresses, menu: `src/lib/site.ts`
- Photos: `src/lib/images.ts`

## Deploying

**Vercel:** import the GitHub repo, Framework Preset **Next.js**, leave build settings at their defaults. `vercel.json` adds security headers and redirects from the old site's demo URLs.

**Cloudflare Pages (alternative):** build command `npm run build`, output directory `out`; `public/_headers` and `public/_redirects` do the same job there.

Either way, point the `mytripworld.net` DNS at the host and keep the MX (email) records on Hostinger.

## Before going live

- Client to confirm package highlights, prices and the draft Privacy Policy / Terms text.

## Technical notes

- `public/_headers` and `public/_redirects` are read by Cloudflare Pages (security headers, caching, and 301s from the old site's demo URLs).
- Favicons are generated from the logo mark: `src/app/icon.png`, `src/app/apple-icon.png`, `public/icon-192.png`, `public/icon-512.png`.
- `design/` holds original artwork (not deployed). `public/hero.jpg` and `public/hero-900.jpg` are the web copies.
