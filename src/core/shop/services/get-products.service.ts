import { productMapper } from "../mappers/product.mapper";
import type { Product } from "../models/product";
import { prisma } from "@/shared/config/prisma";

export async function getProducts(): Promise<Product[]> {
  try {
    const data = await prisma.product.findMany({
      include: { images: { take: 2, select: { url: true } } },
    });
    const products = data.map((item) => productMapper(item));
    return products;
  } catch (error) {
    return [];
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const data = await prisma.product.findMany({
      include: { images: { take: 2, select: { url: true } } },
    });
    const products = data.map((item) => productMapper(item));
    return products;
  } catch (error) {
    return [];
  }
}
