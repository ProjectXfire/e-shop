import type { GenderType, ValidSize } from "../models/product.model";

export interface CartDto {
  id: string;
  productId: string;
  title: string;
  description: string;
  images: string[];
  quantity: number;
  price: number;
  slug: string;
  size: ValidSize;
  gender: GenderType;
}
