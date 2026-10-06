// One-off helper: makes WebP copies of the JPEGs in /public so browsers get
// smaller files. Run with `node scripts/optimize-images.mjs` after adding photos.
import { readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const pub = path.resolve("public");

for (const file of readdirSync(path.join(pub, "photos")).filter((f) => f.endsWith(".jpg"))) {
  const src = path.join(pub, "photos", file);
  await sharp(src).webp({ quality: 72 }).toFile(src.replace(/\.jpg$/, ".webp"));
}

const manifest = {};
for (const file of readdirSync(path.join(pub, "gallery")).filter((f) => f.endsWith(".jpg"))) {
  const src = path.join(pub, "gallery", file);
  const base = src.replace(/\.jpg$/, "");
  const { width, height } = await sharp(src).metadata();
  await sharp(src).webp({ quality: 74 }).toFile(`${base}.webp`);
  await sharp(src).resize({ width: 500 }).webp({ quality: 72 }).toFile(`${base}-500.webp`);
  manifest[file.replace(/\.jpg$/, "")] = { width, height };
}
writeFileSync("src/lib/gallery-manifest.json", JSON.stringify(manifest, null, 2) + "\n");

await sharp(path.join(pub, "hero.jpg")).webp({ quality: 70 }).toFile(path.join(pub, "hero.webp"));
await sharp(path.join(pub, "hero.jpg")).resize({ width: 900 }).webp({ quality: 68 }).toFile(path.join(pub, "hero-900.webp"));
await sharp(path.join(pub, "logo.png")).resize({ width: 400 }).webp({ quality: 90 }).toFile(path.join(pub, "logo.webp"));
console.log("done");
