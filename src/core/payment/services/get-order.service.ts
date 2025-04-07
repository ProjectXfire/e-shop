import type { Response } from "@/shared/interfaces/response.interface";
import type { Order } from "../models/order.model";
import { prisma } from "@/shared/config/prisma";
import { auth } from "@auth";
import { orderMapper } from "../mappers/order.mapper";

export async function getOrderById(id: string): Promise<Response<Order | null>> {
  try {
    const session = await auth();
    const userId = session?.user.id;
    if (!userId)
      return {
        error: "Usuario no autenticado",
        success: null,
        data: null,
      };
    const orderDb = await prisma.order.findUnique({ where: { id, userId } });
    if (!orderDb)
      return {
        error: "No se encontró la orden",
        success: null,
        data: null,
      };
    const orderAddressDb = await prisma.orderAddress.findUnique({
      where: { orderId: orderDb.id },
      include: { country: true },
    });
    if (!orderAddressDb)
      return {
        error: "No se encontró la dirección de la orden",
        success: null,
        data: null,
      };
    const orderProductsDb = await prisma.orderItem.findMany({
      where: { orderId: orderDb.id },
      include: { product: { select: { images: { take: 1, select: { url: true } }, title: true } } },
    });

    const order = orderMapper(orderDb, orderProductsDb, orderAddressDb);

    return {
      error: null,
      success: "Se cargó la orden correctamente",
      data: order,
    };
  } catch (error) {
    return {
      error: "Hubo un error al cargar la orden",
      success: null,
      data: null,
    };
  }
}
