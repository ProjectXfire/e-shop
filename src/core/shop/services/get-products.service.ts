import type { Product } from "../models/product";
import { initialData } from "@/shared/assets/seed";

export async function getProducts(): Promise<Product[]> {
  const products = initialData.products as Product[];
  return products;
}

export async function getProductsByCategory(category: string) {
  const products = initialData.products as Product[];
  return products.filter((prod) => prod.gender === category);
}
