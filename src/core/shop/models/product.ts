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
  category?: ValidType;
  gender: GenderType;
}

type GenderType = "men" | "women" | "kids" | "unisex";
export type ValidSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type ValidType = "shirts" | "pants" | "hoodies" | "hats";
