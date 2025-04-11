import type { Order, OrderItem, OrderTable } from "../models/order.model";

import {
  Order as OrderDb,
  OrderAddress as OrderAddressDb,
  OrderItem as OrderItemDb,
} from "@prisma/client";

interface AddressDbWithJoin extends OrderAddressDb {
  country: { id: string; name: string; code: string };
}

interface OrderItemDbWithJoin extends OrderItemDb {
  product: { title: string; images: { url: string }[] };
}

export function orderMapper(
  order: OrderDb,
  items: OrderItemDbWithJoin[],
  address: AddressDbWithJoin
): Order {
  const { id: orderId, subtotal, tax, delivery, total, itemsInOrder, isPaid, userId } = order;
  const {
    id: addressId,
    firstName,
    lastName,
    address: addressDb,
    city,
    phone,
    postalCode,
    countryId,
    country,
  } = address;

  const orderItems: OrderItem[] = items.map((item) => ({
    id: item.id,
    orderId: item.orderId,
    productId: item.productId,
    price: item.price,
    product: {
      title: item.product.title,
      images: item.product.images.map((img) => img.url),
    },
    quantity: item.quantity,
    size: item.size,
  }));

  const orderModel: Order = {
    id: orderId,
    shortId: orderId.substring(0, 8),
    subtotal,
    tax,
    delivery,
    total,
    itemsInOrder,
    isPaid,
    userId,
    deliveryAddress: {
      id: addressId,
      firstName,
      lastName,
      address: addressDb,
      city,
      phone,
      postalCode,
      countryId,
      country,
    },
    items: orderItems,
  };
  return orderModel;
}

interface OrderDbWithJoin extends OrderDb {
  user: { firstName: string; lastName: string };
}

export function orderTableAdminMapper(order: OrderDbWithJoin) {
  const { id, isPaid, paidAt, createdAt, user } = order;
  const orderTable: OrderTable = {
    id,
    shortId: id.substring(0, 8),
    isPaid,
    user: `${user.firstName} ${user.lastName}`,
    paidAt,
    createdAt,
  };
  return orderTable;
}

export function orderTableMapper(order: OrderDb, user: string): OrderTable {
  const { id, isPaid, paidAt, createdAt } = order;
  const orderTable: OrderTable = {
    id,
    shortId: id.substring(0, 8),
    isPaid,
    user,
    paidAt,
    createdAt,
  };
  return orderTable;
}
