import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import type { RawDoc } from "./source";

type Update = {
  slug: string;
  id: string;
  expected: Record<string, unknown>;
  set: Record<string, unknown>;
  create?: Record<string, unknown>;
  fallback: Record<string, unknown>;
};

function stable(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stable).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => `${JSON.stringify(k)}:${stable(v)}`).join(",")}}`;
  }
  return JSON.stringify(value ?? null);
}

/** Reviewed brochure corrections pending CMS sync. Later CMS edits take precedence. */
export function applyPackageUpdates(docs: RawDoc[], seed = false): RawDoc[] {
  const updated = [...docs];
  const directory = path.join(process.cwd(), "src", "lib", "content", "package-updates");
  for (const file of readdirSync(directory).filter((f) => f.endsWith(".json")).sort()) {
    const update = JSON.parse(readFileSync(path.join(directory, file), "utf8")) as Update;
    const index = updated.findIndex((d) => d._type === "package" && !d._id.startsWith("drafts.") && (d.slug as { current?: string } | undefined)?.current === update.slug);
    if (index < 0) {
      const initial = seed ? update.fallback : update.create;
      if (initial) updated.push({ ...initial, _id: update.id, _type: "package" });
      continue;
    }
    if (update.create) continue;
    const doc = { ...updated[index] };
    for (const [key, value] of Object.entries(update.set)) {
      if (stable(doc[key]) === stable(update.expected[key])) doc[key] = value;
    }
    updated[index] = doc;
  }
  return updated;
}
