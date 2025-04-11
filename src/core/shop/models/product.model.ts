import type { Category } from "./category.model";

export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ValidSize[];
  slug: string;
  tags: string[];
  title: string;
  category: Category;
  gender: GenderType;
}

export type GenderType = "men" | "women" | "kids" | "unisex";
export type ValidSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
