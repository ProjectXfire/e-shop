import { ValidSize } from "@/core/shop/models/product.model";

export interface CreateOrderDto {
  subtotal: number;
  total: number;
  tax: number;
  delivery: number;
  itemsInOrder: number;
  isPaid: boolean;
}

export interface CreateOrderItemDto {
  size: ValidSize;
  price: number;
  quantity: number;
  productId: string;
}

export interface CreateOrderAddressDto {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  countryId: string;
  phone: string;
  postalCode: string;
}
