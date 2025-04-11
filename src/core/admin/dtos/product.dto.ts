export interface CreateProductDto {
  title: string;
  description: string;
  inStock: number;
  price: number;
  sizes: ValidSize[];
  slug: string;
  gender: GenderType;
  categoryId: string;
}

export interface UpdateProductDto extends CreateProductDto {
  tags: string[];
}

type GenderType = "men" | "women" | "kids" | "unisex";
type ValidSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
