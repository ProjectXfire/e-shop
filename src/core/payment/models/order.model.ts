import type { Country } from "./country.model";

export interface OrderTable {
  id: string;
  shortId: string;
  user: string;
  isPaid: boolean;
}

export interface Order {
  id: string;
  shortId: string;
  subtotal: number;
  total: number;
  tax: number;
  delivery: number;
  itemsInOrder: number;
  isPaid: boolean;
  userId: string;
  items: OrderItem[];
  deliveryAddress: OrderAddress;
}

export interface OrderItem {
  id: string;
  size: string;
  price: number;
  quantity: number;
  orderId: string;
  productId: string;
  product: OrderProduct;
}

interface OrderProduct {
  images: string[];
  title: string;
}

export interface OrderAddress {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  countryId: string;
  phone: string;
  postalCode: string;
  country: Country;
}
