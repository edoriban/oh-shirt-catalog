import type { ImageMetadata } from "astro";
import { categories, type Category } from "./categories";

export interface Product {
  id: string;
  name: string;
  category: string;
  image: ImageMetadata;
}

const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/products/**/*.webp",
  { eager: true }
);

function buildProducts(): Product[] {
  const products: Product[] = [];

  for (const [path, mod] of Object.entries(imageModules)) {
    // path: /src/assets/products/demon-slayer/akasa.webp
    const segments = path.split("/");
    const categorySlug = segments[segments.length - 2];
    const fileName = segments[segments.length - 1].replace(".webp", "");

    products.push({
      id: `${categorySlug}-${fileName}`,
      name: fileName
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      category: categorySlug,
      image: mod.default,
    });
  }

  return products.sort((a, b) => a.id.localeCompare(b.id));
}

const allProducts = buildProducts();

export function getAllProducts(): Product[] {
  return allProducts;
}

export function getProductsByCategory(slug: string): Product[] {
  return allProducts.filter((p) => p.category === slug);
}

export function getCategoryInfo(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
