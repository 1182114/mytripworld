# Enquiry email setup

Code is ready; no production secrets have been added and no live email has been tested.

## Cloudflare Pages website + Hostinger email

1. Create a Resend account. Verify `mytripworld.net` as the sending domain using the exact DNS records Resend provides. Some of those records are created on the `send` subdomain; that is only Resend's return path, and the sender address still ends in `@mytripworld.net`. Add these where authoritative DNS is managed (Cloudflare if its nameservers are active). Leave the existing Hostinger mailbox MX records for `mytripworld.net` in place.
2. In the Cloudflare **Pages project → Settings → Variables and Secrets**, add:

   | Name | Value | Type |
   | --- | --- | --- |
   | `RESEND_API_KEY` | Your Resend sending API key | Secret |
   | `ENQUIRY_FROM_EMAIL` | `My Trip World <enquiries@mytripworld.net>` | Variable |
   | `ENQUIRY_NOTIFY_EMAIL` | `info@mytripworld.net` | Variable |
   | `ENQUIRY_API` | `1` | Build variable |
   | `STATIC_EXPORT` | `1` | Build variable |

3. Deploy the repository using Pages Git integration with output directory `out` and build command `npm run build -- --webpack`. Alternatively build with `ENQUIRY_API=1 STATIC_EXPORT=1 npm run build -- --webpack`, then run `npx wrangler pages deploy out --project-name YOUR_EXISTING_PROJECT` from the repository root so Wrangler includes `functions/api/enquiry.ts`. Dashboard drag-and-drop does **not** compile the Functions directory. Variables are read when a deployment is created: after adding or changing one, open **Deployments** and use **Retry deployment** on the latest Production deployment (or push a commit), otherwise the live site keeps the old value. Configure preview variables separately if testing a preview deployment.
4. Open `/contact/`, submit a clearly labelled test enquiry, and check the thank-you message, the Resend delivery event and the inbox/spam folder at `info@mytripworld.net`. Verify name, phone, destination, travellers, travel month, notes and page arrive correctly. A thank-you means provider acceptance; it does not prove inbox delivery.

References: [Pages Functions](https://developers.cloudflare.com/pages/functions/get-started/), [bindings and secrets](https://developers.cloudflare.com/pages/functions/bindings/), [Resend domain verification](https://resend.com/docs/dashboard/domains/introduction), [email API](https://resend.com/docs/api-reference/emails/send-email).

## If Cloudflare is only DNS and the website is hosted on Hostinger

The Pages function does not run on Hostinger static hosting. For a Hostinger plan
that runs Next.js Node applications, set `STATIC_EXPORT=0` and the email variables
above on that application's server, build and start the Next.js app. For static-only
Hostinger hosting, a separate server endpoint or a move of this site to Cloudflare
Pages is required. Do not enable `ENQUIRY_API=1` for a static deployment without an API.

## Optional admin copy and local checks

Provide `SANITY_PROJECT_ID`, `SANITY_DATASET` and secret `SANITY_WRITE_TOKEN` to
also save the enquiry to Sanity. If this save fails after email acceptance, the
visitor still receives success and the server logs an admin-copy failure.

Use `.env.local` with `STATIC_EXPORT=0` for local Next.js API testing. Never commit
API keys, mailbox passwords or `.dev.vars`; never expose keys with `NEXT_PUBLIC_`.
Run `node --experimental-strip-types scripts/check-enquiry.mjs` for mocked handler
checks (no real emails), then `npm run lint` and `npx tsc --noEmit --incremental false`.
The memory rate limiter is per running instance; production-wide rate limiting
can be configured at the host if needed.
