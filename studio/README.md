# My Trip World — Admin panel (Sanity Studio)

This folder is the admin panel where the My Trip World team edits the website:
packages, prices, itineraries, photos, reviews, FAQs, city pages, contact details
and enquiries. It is hosted by Sanity at **https://mytripworld.sanity.studio**
(the website's `/admin` address sends you there).

## One-time setup (done by the developer)

1. **Log in** – `cd studio && npx sanity login` and sign in in the browser.
2. **Create the project** – at https://www.sanity.io/manage create a project named
   "My Trip World" with a dataset called `production`. Copy the **Project ID**.
3. **Tell the studio which project** – copy `.env.example` to `.env` and paste the ID.
4. **Load the starting content** – `npm run seed:import`
   (uploads all current website content and photos; run once only).
5. **Publish the admin panel** – `npm run deploy`
6. **Connect the website** – in the website's hosting settings (Vercel) add:
   - `SANITY_PROJECT_ID` – the project ID
   - `SANITY_DATASET` – `production`
   - `SANITY_WRITE_TOKEN` – a token with *Editor* rights
     (sanity.io/manage → API → Tokens). Keep it secret.
7. **Auto-publish** – create a Deploy Hook in Vercel (Settings → Git → Deploy Hooks),
   then in sanity.io/manage → API → Webhooks add a webhook that POSTs to that URL
   on create / update / delete, with the filter
   `_type != "enquiry"` so that new enquiries do not rebuild the site.
8. **Allow the admin panel to talk to the project** – sanity.io/manage → API →
   CORS origins → add `https://mytripworld.sanity.studio` with credentials allowed
   (`npm run deploy` normally does this for you).
9. **Invite the client** – sanity.io/manage → Members → invite their email.

## Everyday commands

```bash
npm run dev      # open the admin panel on this computer (http://localhost:3333)
npm run deploy   # publish changes to the admin panel itself (after editing schemas)
```

## How the website uses this

When someone presses **Publish** in the admin panel, Sanity calls the deploy hook
and the website rebuilds in a minute or two with the new content. If the website
cannot reach Sanity, or a required field is empty, the build stops with a clear
message instead of publishing a broken page.

See `CLIENT-GUIDE.md` for the day-to-day guide written for the My Trip World team.
