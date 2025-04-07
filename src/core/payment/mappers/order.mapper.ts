import type { Order, OrderItem, OrderTable } from "../models/order.model";

export function orderMapper(
  order: Record<string, any>,
  items: Record<string, any>[],
  address: Record<string, any>
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
      images: item.product.images.map((img: any) => img.url),
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

export function orderTableMapper(order: Record<string, any>, user: string): OrderTable {
  const { id, isPaid } = order;
  const orderTable: OrderTable = { id, shortId: id.substring(0, 8), isPaid, user };
  return orderTable;
}
