import { readdir, mkdir } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PLAYERAS_DIR = join(__dirname, "..", "..", "PLAYERAS");
const OUTPUT_DIR = join(__dirname, "..", "src", "assets", "products");

const CATEGORIES = [
  { folder: "DEMON SLAYER", slug: "demon-slayer" },
  { folder: "STAR WARS", slug: "star-wars" },
  { folder: "CABALLEROS DEL ZODIACO", slug: "caballeros-del-zodiaco" },
  { folder: "ONE PIECE", slug: "one-piece" },
  { folder: "THUNDERCATS", slug: "thundercats" },
  { folder: "STRANGER THINGS", slug: "stranger-things" },
];

function sanitizeName(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}

let totalProcessed = 0;

for (const { folder, slug } of CATEGORIES) {
  const srcDir = join(PLAYERAS_DIR, folder);
  const destDir = join(OUTPUT_DIR, slug);
  await mkdir(destDir, { recursive: true });

  const files = await readdir(srcDir);
  const jpgs = files.filter(
    (f) => extname(f).toLowerCase() === ".jpg" || extname(f).toLowerCase() === ".jpeg"
  );

  console.log(`\n📁 ${folder} (${jpgs.length} images) → ${slug}/`);

  for (const file of jpgs) {
    const baseName = sanitizeName(file.replace(/\.(jpg|jpeg)$/i, ""));
    const outFile = `${baseName}.webp`;
    const srcPath = join(srcDir, file);
    const destPath = join(destDir, outFile);

    await sharp(srcPath)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(destPath);

    totalProcessed++;
    process.stdout.write(`  ✓ ${outFile}\n`);
  }
}

console.log(`\n✅ Done! Processed ${totalProcessed} images.`);
