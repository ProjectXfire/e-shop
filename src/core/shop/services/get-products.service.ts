import type { Product, GenderType } from "../models/product.model";
import { unstable_cache } from "next/cache";
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
      include: { images: { take: 2, select: { url: true } }, category: true },
      skip: (page - 1) * take,
      take,
    });
    const totalProducts = await prisma.product.count();
    const products = data.map((item) => productMapper(item));
    return { pages: Math.ceil(totalProducts / take), products };
  } catch {
    return { pages: 0, products: [] };
  }
}

export async function getProductsCache({
  page = 1,
  take = 12,
}: PaginationOptions): Promise<ReturnProducts> {
  try {
    if (page < 1) page = 1;

    const cacheFuntionList = unstable_cache(
      async () => {
        return await prisma.product.findMany({
          include: { images: { take: 2, select: { url: true } }, category: true },
          skip: (page - 1) * take,
          take,
        });
      },
      [`products`],
      { tags: ["products"], revalidate: 3600 }
    );
    const data = await cacheFuntionList();
    const cacheFunctionTotalItems = unstable_cache(
      async () => {
        return await prisma.product.count();
      },
      ["products-length"],
      { tags: ["products"], revalidate: 3600 }
    );
    const totalProducts = await cacheFunctionTotalItems();
    const products = data.map((item) => productMapper(item));
    return { pages: Math.ceil(totalProducts / take), products };
  } catch {
    return { pages: 0, products: [] };
  }
}

export async function getProductsByGender(
  genderSlug: string,
  { page = 1, take = 12 }: PaginationOptions
): Promise<ReturnProducts> {
  try {
    if (page < 1) page = 1;
    const gender = genderSlug as GenderType;
    const data = await prisma.product.findMany({
      include: { images: { take: 2, select: { url: true } }, category: true },
      where: { gender },
      skip: (page - 1) * take,
      take,
    });
    const totalProducts = await prisma.product.count({ where: { gender } });
    const products = data.map((item) => productMapper(item));
    return { products, pages: Math.ceil(totalProducts / take) };
  } catch {
    return { pages: 0, products: [] };
  }
}

export async function getProductsByGenderCache(
  genderSlug: string,
  { page = 1, take = 12 }: PaginationOptions
): Promise<ReturnProducts> {
  try {
    if (page < 1) page = 1;
    const gender = genderSlug as GenderType;
    const cacheFuntionList = unstable_cache(async () => {
      return await prisma.product.findMany({
        include: { images: { take: 2, select: { url: true } }, category: true },
        where: { gender },
        skip: (page - 1) * take,
        take,
      });
    }, []);
    const data = await cacheFuntionList();
    const cacheFunctionTotalItems = unstable_cache(
      async () => {
        return await prisma.product.count({ where: { gender } });
      },
      ["products-length"],
      { tags: ["products"], revalidate: 3600 }
    );
    const totalProducts = await cacheFunctionTotalItems();
    const products = data.map((item) => productMapper(item));
    return { products, pages: Math.ceil(totalProducts / take) };
  } catch {
    return { pages: 0, products: [] };
  }
}
