import type { Product, GenderType } from "../models/product";
import { productMapper } from "../mappers/product.mapper";
import { prisma } from "@/shared/config/prisma";

interface ReturnProducts {
  products: Product[];
  pages: number;
}

interface PaginationOptions {
  page?: number;
  take?: number;
}

export async function getProducts({
  page = 1,
  take = 12,
}: PaginationOptions): Promise<ReturnProducts> {
  try {
    if (page < 1) page = 1;
    const data = await prisma.product.findMany({
      include: { images: { take: 2, select: { url: true } } },
      skip: (page - 1) * take,
      take,
    });
    const totalProducts = await prisma.product.count();
    const products = data.map((item) => productMapper(item));
    return { pages: Math.ceil(totalProducts / take), products };
  } catch (error) {
    return { pages: 0, products: [] };
  }
}

export async function getProductsByCategory(
  genderSlug: string,
  { page = 1, take = 12 }: PaginationOptions
): Promise<ReturnProducts> {
  try {
    if (page < 1) page = 1;
    const gender = genderSlug as GenderType;
    const data = await prisma.product.findMany({
      include: { images: { take: 2, select: { url: true } } },
      where: { gender },
      skip: (page - 1) * take,
      take,
    });
    const totalProducts = await prisma.product.count({ where: { gender } });
    const products = data.map((item) => productMapper(item));
    return { products, pages: Math.ceil(totalProducts / take) };
  } catch (error) {
    return { pages: 0, products: [] };
  }
}
