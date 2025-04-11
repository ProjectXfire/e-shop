import type { Product } from "../models/product.model";
import { Product as ProductDb } from "@prisma/client";

interface ProductDbWithJoin extends ProductDb {
  images: { url: string }[];
  category: { id: string; name: string };
}

export function productMapper(data: ProductDbWithJoin): Product {
  const { id, title, description, inStock, price, sizes, slug, tags, gender, images, category } =
    data;
  const imagesProduct: string[] = images.map((img) => img.url);
  const product: Product = {
    id,
    category,
    description,
    gender,
    images: imagesProduct,
    inStock,
    price,
    sizes,
    slug,
    tags,
    title,
  };
  return product;
}
