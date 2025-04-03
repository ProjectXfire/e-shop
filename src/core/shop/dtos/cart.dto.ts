import type { GenderType, ValidSize, ValidType } from "../models/product.model";

export interface CartDto {
  id: string;
  title: string;
  description: string;
  images: string[];
  quantity: number;
  price: number;
  slug: string;
  size: ValidSize;
  gender: GenderType;
}
