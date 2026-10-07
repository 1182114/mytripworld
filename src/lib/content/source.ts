import { readFileSync } from "node:fs";
import path from "node:path";
import https from "node:https";

export type RawDoc = { _id: string; _type: string; [key: string]: unknown };

export const sanityProject = process.env.SANITY_PROJECT_ID;
export const sanityDataset = process.env.SANITY_DATASET || "production";

/**
 * Where the website's content comes from at build time.
 *
 * - Normal case: the Sanity project named by SANITY_PROJECT_ID. Once this is set
 *   it always wins.
 * - CONTENT_SOURCE=seed (only when no project is set): the migration snapshot in
 *   studio/seed/content.ndjson. An explicit opt-in for building before the
 *   Sanity project exists.
 *
 * There is deliberately no silent fallback: if content cannot be loaded the
 * build fails, so an empty or half-empty site can never be published.
 */
export async function loadRawDocs(): Promise<{ docs: RawDoc[]; mode: "sanity" | "seed" }> {
  const readFile = (file: string) =>
    readFileSync(file, "utf8")
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as RawDoc);

  // PREVIEW_FILE: build from a local snapshot on purpose (for example to preview an
  // unpublished draft). Never set this on the live host.
  if (process.env.PREVIEW_FILE) return { docs: readFile(process.env.PREVIEW_FILE), mode: "seed" };

  if (!sanityProject) {
    if (process.env.CONTENT_SOURCE === "seed") {
      return { docs: readFile(path.join(process.cwd(), "studio", "seed", "content.ndjson")), mode: "seed" };
    }
    throw new Error(
      "Content source is not configured. Set SANITY_PROJECT_ID (and SANITY_DATASET) so the site can load its content from Sanity, " +
        "or set CONTENT_SOURCE=seed to build from the snapshot in studio/seed/content.ndjson.",
    );
  }

  // Read with Node's own HTTPS client rather than fetch(): Next.js keeps fetch()
  // responses in its build cache (.next/cache), so a rebuild after "Publish"
  // could otherwise ship older content.
  const query = `*[_type in ["siteSettings","homePage","pageContent","legalPage","package","destination","city","testimonial","galleryItem","faq","offer"]]`;
  const url = `https://${sanityProject}.api.sanity.io/v2025-02-19/data/query/${sanityDataset}?perspective=published&query=${encodeURIComponent(query)}`;
  let docs: RawDoc[];
  try {
    docs = (await withRetry(() => getJson<{ result: RawDoc[] }>(url, process.env.SANITY_READ_TOKEN))).result;
  } catch (error) {
    throw new Error(`Could not load content from Sanity project "${sanityProject}" (dataset "${sanityDataset}"): ${(error as Error).message}`);
  }
  if (!Array.isArray(docs)) throw new Error(`Sanity project "${sanityProject}" returned an unexpected response.`);
  if (!docs.length) {
    throw new Error(`Sanity project "${sanityProject}" (dataset "${sanityDataset}") returned no content. Import the content first (see studio/README.md).`);
  }
  return { docs, mode: "sanity" };
}

/** A brief network blip should not fail a deploy; a real outage still does, after three tries. */
async function withRetry<T>(run: () => Promise<T>, attempts = 3): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await run();
    } catch (error) {
      lastError = error;
      if (i < attempts - 1) await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
    }
  }
  throw lastError;
}

function getJson<T>(url: string, token?: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: token ? { Authorization: `Bearer ${token}` } : {}, timeout: 30_000 }, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}: ${body.slice(0, 300)}`));
        try {
          resolve(JSON.parse(body) as T);
        } catch {
          reject(new Error("The response was not valid JSON."));
        }
      });
    });
    req.on("timeout", () => req.destroy(new Error("The request timed out.")));
    req.on("error", reject);
  });
}
