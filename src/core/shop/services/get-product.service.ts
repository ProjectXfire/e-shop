import type { Product } from "../models/product";
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
