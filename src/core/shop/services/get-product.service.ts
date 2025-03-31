"use server";

import type { Product } from "../models/product";
import { unstable_cache } from "next/cache";
import { prisma } from "@/shared/config/prisma";
import { productMapper } from "../mappers/product.mapper";

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const data = await prisma.product.findUnique({
      where: { slug },
      include: { images: { select: { url: true } } },
    });
    if (!data) throw new Error("Product not found");
    const product = productMapper(data);
    return product;
  } catch (error) {
    return null;
  }
}

export async function getStockBySlug(slug: string): Promise<number> {
  try {
    const data = await prisma.product.findUnique({
      where: { slug },
      select: { inStock: true },
    });
    if (!data) throw new Error("Product not found");
    return data.inStock;
  } catch (error) {
    return 0;
  }
}

export async function getProductBySlugCache(slug: string): Promise<Product | null> {
  try {
    const cacheFuntion = unstable_cache(
      async () => {
        return await prisma.product.findUnique({
          where: { slug },
          include: { images: { select: { url: true } } },
        });
      },
      [`product-${slug}`],
      { tags: ["products"], revalidate: 3600 }
    );
    const data = await cacheFuntion();
    if (!data) throw new Error("Product not found");
    const product = productMapper(data);
    return product;
  } catch (error) {
    return null;
  }
}


