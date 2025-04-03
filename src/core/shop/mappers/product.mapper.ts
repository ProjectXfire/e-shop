import type { Product } from "../models/product.model";

export function productMapper(data: Record<string, any>): Product {
  const { id, title, description, inStock, price, sizes, slug, tags, gender, images, category } =
    data;
  const imagesProduct: string[] = images.map((img: any) => img.url);
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
