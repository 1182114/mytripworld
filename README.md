# My Trip World — website

Static marketing site for My Trip World (mytripworld.net), built with Next.js (static export) and Tailwind CSS.

## Commands

```bash
npm run dev     # local development at http://localhost:3000
npm run build   # writes the finished static site to ./out
```

## Editing content

All content — packages, prices, itineraries, photos, reviews, FAQs, city pages,
contact details — is edited in the admin panel (Sanity Studio) in `studio/`.
See `studio/README.md` for setup and `studio/CLIENT-GUIDE.md` for the client guide.

The website loads that content at build time (`src/lib/content/`). Environment
variables are listed in `.env.example`. If content cannot be loaded, or a required
field is missing, the build fails with a clear message rather than publishing an
incomplete site. Until the Sanity project exists, `CONTENT_SOURCE=seed` in
`.env.local` builds from the snapshot in `studio/seed/content.ndjson`.

## Deploying

**Vercel:** import the GitHub repo, Framework Preset **Next.js**, leave build settings at their defaults. `vercel.json` adds security headers and redirects from the old site's demo URLs.

**Cloudflare Pages (alternative):** build command `npm run build`, output directory `out`; `public/_headers` and `public/_redirects` do the same job there.

Either way, point the `mytripworld.net` DNS at the host and keep the MX (email) records on Hostinger.

## SEO

`/llms.txt`, `sitemap.xml`, `robots.txt`, page titles and all schema markup are
generated from the admin-panel content at build time. After adding photos to
`public/`, run `node scripts/optimize-images.mjs` to create the WebP copies.

## Enquiries

On Vercel the form posts to `/api/enquiry`, which saves the enquiry in the admin
panel (needs `SANITY_WRITE_TOKEN`) and can email the team through Resend. On a
static-only host the form hands the enquiry to WhatsApp instead.

## Before going live

- Client to confirm package highlights, prices and the draft Privacy Policy / Terms text.

## Technical notes

- `public/_headers` and `public/_redirects` are read by Cloudflare Pages (security headers, caching, and 301s from the old site's demo URLs).
- Favicons are generated from the logo mark: `src/app/icon.png`, `src/app/apple-icon.png`, `public/icon-192.png`, `public/icon-512.png`.
- `design/` holds original artwork (not deployed). `public/hero.jpg` and `public/hero-900.jpg` are the web copies.
