import type { Response } from "@/shared/interfaces/response.interface";
import type { Product, GenderType } from "../models/product.model";
import { unstable_cache } from "next/cache";
import { productMapper } from "../mappers/product.mapper";
import { prisma } from "@/shared/config/prisma";
import { Size } from "@prisma/client";

interface ReturnProducts {
  products: Product[];
  pages: number;
}

interface QueryOption {
  searchValue?: string;
  price?: number[];
  sizes?: string[];
  page?: number;
  take?: number;
  orderBy?: "asc" | "desc";
}

export async function getProducts({ page = 1, take = 12 }: QueryOption): Promise<ReturnProducts> {
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

export async function getFilteredProducts({
  page = 1,
  take = 12,
  orderBy,
  price,
  sizes,
  searchValue,
}: QueryOption): Promise<Response<ReturnProducts | null>> {
  try {
    if (page < 1) page = 1;
    if (price === undefined) price = [];
    let sizesFilter = sizes;
    if (sizesFilter === undefined) sizesFilter = [];
    const data = await prisma.product.findMany({
      include: { images: { take: 2, select: { url: true } }, category: true },
      skip: (page - 1) * take,
      orderBy: { title: orderBy },
      take,
      where: {
        AND: [
          {
            OR: [
              { title: { contains: searchValue, mode: "insensitive" } },
              { description: { contains: searchValue, mode: "insensitive" } },
            ],
          },
          { price: { gte: price[0], lte: price[1] } },
          {
            ...(sizesFilter.length > 0 && {
              sizes: {
                hasSome: sizesFilter as Size[],
              },
            }),
          },
        ],
      },
    });
    const totalProducts = await prisma.product.count({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: searchValue, mode: "insensitive" } },
              { description: { contains: searchValue, mode: "insensitive" } },
            ],
          },
          { price: { gte: price[0], lte: price[1] } },
          {
            ...(sizesFilter.length > 0 && {
              sizes: {
                hasSome: sizesFilter as Size[],
              },
            }),
          },
        ],
      },
    });
    const products = data.map((item) => productMapper(item));
    return {
      error: null,
      success: "Productos cargados",
      data: { pages: Math.ceil(totalProducts / take), products },
    };
  } catch {
    return { error: "No se pudo cargar los productos", success: null, data: null };
  }
}

export async function getProductsCache({
  page = 1,
  take = 12,
}: QueryOption): Promise<ReturnProducts> {
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
  { page = 1, take = 12, searchValue, price, orderBy, sizes }: QueryOption
): Promise<ReturnProducts> {
  try {
    if (page < 1) page = 1;
    if (price === undefined) price = [];
    let sizesFilter = sizes;
    if (sizesFilter === undefined) sizesFilter = [];
    const gender = genderSlug as GenderType;
    const data = await prisma.product.findMany({
      include: { images: { take: 2, select: { url: true } }, category: true },
      where: {
        AND: [
          { gender },
          {
            OR: [
              { title: { contains: searchValue, mode: "insensitive" } },
              { description: { contains: searchValue, mode: "insensitive" } },
            ],
          },
          { price: { gte: price[0], lte: price[1] } },
          {
            ...(sizesFilter.length > 0 && {
              sizes: {
                hasSome: sizesFilter as Size[],
              },
            }),
          },
        ],
      },
      skip: (page - 1) * take,
      take,
    });
    const totalProducts = await prisma.product.count({
      where: {
        AND: [
          { gender },
          {
            OR: [
              { title: { contains: searchValue, mode: "insensitive" } },
              { description: { contains: searchValue, mode: "insensitive" } },
            ],
          },
          { price: { gte: price[0], lte: price[1] } },
          {
            ...(sizesFilter.length > 0 && {
              sizes: {
                hasSome: sizesFilter as Size[],
              },
            }),
          },
        ],
      },
    });
    const products = data.map((item) => productMapper(item));
    return { products, pages: Math.ceil(totalProducts / take) };
  } catch {
    return { pages: 0, products: [] };
  }
}

export async function getProductsByGenderCache(
  genderSlug: string,
  { page = 1, take = 12, searchValue }: QueryOption
): Promise<ReturnProducts> {
  try {
    if (page < 1) page = 1;
    const gender = genderSlug as GenderType;
    const cacheFuntionList = unstable_cache(
      async () => {
        return await prisma.product.findMany({
          include: { images: { take: 2, select: { url: true } }, category: true },
          where: {
            AND: {
              gender,
              OR: [
                { title: { contains: searchValue, mode: "insensitive" } },
                { description: { contains: searchValue, mode: "insensitive" } },
              ],
            },
          },
          skip: (page - 1) * take,
          take,
        });
      },
      [`products-${gender}`],
      { tags: ["products"] }
    );
    const data = await cacheFuntionList();
    const cacheFunctionTotalItems = unstable_cache(
      async () => {
        return await prisma.product.count({
          where: {
            AND: {
              gender,
              OR: [
                { title: { contains: searchValue, mode: "insensitive" } },
                { description: { contains: searchValue, mode: "insensitive" } },
              ],
            },
          },
        });
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
