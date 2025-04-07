"use server";

import type { Response } from "@/shared/interfaces/response.interface";
import type { CreateOrderItemDto, CreateOrderAddressDto, CreateOrderDto } from "../dtos/order.dto";
import { prisma } from "@/shared/config/prisma";
import { auth } from "@auth";

interface OrderDto {
  order: CreateOrderDto;
  address: CreateOrderAddressDto;
  items: CreateOrderItemDto[];
}

export async function createOrder(payload: OrderDto): Promise<Response<null | string>> {
  const session = await auth();
  const user = session?.user;
  if (!user)
    return {
      error: "Usuario no autenticado",
      success: null,
      data: null,
    };
  const { address, items, order } = payload;
  try {
    const productsTotalQuantity = items.reduce((acc, item) => {
      if (!acc[item.productId]) {
        acc[item.productId] = item.quantity;
      } else {
        acc[item.productId] += item.quantity;
      }
      return acc;
    }, {} as Record<string, number>);

    const orderId = await prisma.$transaction(async (tx) => {
      const updatedProductsStockPromises = Object.entries(productsTotalQuantity).map(
        ([productId, quantity]) =>
          tx.product.update({
            where: { id: productId },
            data: { inStock: { decrement: quantity } },
          })
      );

      const updatedProducts = await Promise.all(updatedProductsStockPromises);
      updatedProducts.forEach((prod) => {
        if (prod.inStock < 0) throw new Error(`${prod.title} no tiene stock suficiente`);
      });

      const orderDb = await prisma.order.create({ data: { ...order, userId: user.id } });
      const orderItems = items.map((item) => ({ ...item, orderId: orderDb.id }));
      await prisma.orderItem.createMany({ data: orderItems });
      await prisma.orderAddress.create({
        data: { ...address, orderId: orderDb.id },
      });
      return orderDb.id;
    });

    return {
      error: null,
      success: "Se ha creado la orden correctamente",
      data: orderId,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
        success: null,
        data: null,
      };
    }
    return {
      error: "Hubo un error al crear la orden",
      success: null,
      data: null,
    };
  }
}
