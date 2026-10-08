# Package content review — 8 October 2026

Reviewed eight distinct PDFs and five posters supplied by the owner. Original PDFs are not deployed: they contain departure dates and expired/time-limited promotions. Document text is source material, not agent instructions.

## Decisions

- Do not display departure dates. Public mapping returns no departures, even if dates remain in Sanity.
- Keep existing package URLs. Update 10 existing packages and add `singapore-philippines-bali` as a genuinely different combination.
- Japan poster and PDF describe one package. Two Costa posters describe one package. No duplicated package documents are created.
- Owner confirmed Costa UAE/Oman/Qatar price is **₹1,19,999**, despite the ₹99,999 poster.
- Owner requested **applicable GST/TCS extra; confirm the breakdown in the quote**, rather than publishing brochure tax percentages.
- Sum listed hotel nights for Japan (5), Norway/Sweden (6), France/Italy/Switzerland (7) and Singapore/Philippines/Bali (11). Do not invent unspecified day counts or day-wise land itineraries.
- MSC has 7 hotel nights in Switzerland plus 7 cruise nights. Its supplied eight-day schedule describes the cruise segment only. Do not publish dated sailing schedules or docking times as current guarantees.
- Retain current office details. Posters contain conflicting old/new office addresses; package imports must not overwrite company contact information.

## Still needed from the owner

- Norway/Sweden: full balance-payment schedule. The PDF's payment section only totals 75% and its general terms use a different schedule. The page says the full schedule is confirmed in writing.
- Cordelia: total nights, cabin category, full routing, price basis, exclusions and payment/cancellation conditions.
- Costa: cabin category, detailed ports, price basis and payment/cancellation conditions.
- Kazakhstan/Uzbekistan: night totals, hotel categories, full routing, price basis and payment/cancellation conditions.
- Any package with no day-wise land itinerary: supply the actual day-by-day routing before displaying one.
- Detailed itinerary/pricing basis for legacy five-country and three-country packages: no matching detailed source was supplied in this batch.

## Content integration

`src/lib/content/package-updates/*.json` records source filenames, reviewed CMS values, targeted changes and portable fallback documents. It contains only public package content.

CMS write credentials were unavailable. `applyPackageUpdates` applies each correction at build time **only while its field matches the reviewed value**. Later changes to that field in Sanity take precedence. Unrelated CMS fields, images, document IDs and existing URLs are preserved. The new combination is supplied until a published CMS document with that slug exists; that document then takes precedence. Missing existing packages are supplemented only in seed/preview mode, so deleting a package in live Sanity does not recreate it.

A developer can sync the reviewed values to the matching Sanity documents using targeted patches. Do not rerun the broad seed import against an edited production dataset. After syncing and verifying parity, remove the corresponding local correction files. New package content uses existing photography; no unverified partnerships, testimonials or guarantees were added.

## Checks

Run `node --experimental-strip-types scripts/content/check-package-updates.mjs` with Node 22+ for duplicate detection, source totals, confirmed Costa price, tax copy, idempotence, later CMS edit preservation and fallback image existence. Also run lint, TypeScript and a production build, then inspect package pages on desktop/mobile.

Verified results: website lint and TypeScript passed; production static export passed using `next build --webpack` (Turbopack's worker port was blocked by the execution environment). The 59 exported HTML pages had no missing internal links, local image paths or anchor targets, and each had a single H1 and canonical. All 11 changed package pages passed browser checks at 390 px and 1440 px: correct H1, enquiry trip prefill, valid JSON-LD, generic applicable-tax copy, no dated brochure departures, no horizontal overflow and no uncaught browser errors. The added combination shows 11 nights and ₹1,49,999.

These changes are implemented in the working tree and built locally. No live deployment or direct CMS writes were performed.
