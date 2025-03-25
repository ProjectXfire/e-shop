import type { Product } from "../models/product";
import { initialData } from "@/shared/assets/seed";

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = initialData.products.find((prod) => prod.slug === slug);
  if (!product) return null;
  return product as Product;
}
