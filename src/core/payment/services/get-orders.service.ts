import type { Response } from "@/shared/interfaces/response.interface";
import type { OrderTable } from "../models/order.model";
import { prisma } from "@/shared/config/prisma";
import { auth } from "@auth";
import { orderTableMapper } from "../mappers/order.mapper";

export async function getOrdersByUser(): Promise<Response<OrderTable[] | null>> {
  try {
    const session = await auth();
    const userId = session?.user.id;
    if (!userId)
      return {
        error: "Usuario no autenticado",
        success: null,
        data: null,
      };
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return {
        error: "Usuario no encontrado",
        success: null,
        data: null,
      };
    const orders = await prisma.order.findMany({ where: { userId } });
    const ordersTable = orders.map((order) =>
      orderTableMapper(order, `${user.firstName} ${user.lastName}`)
    );
    return {
      error: null,
      success: "Se cargaron las órdenes",
      data: ordersTable,
    };
  } catch (error) {
    return {
      error: "No se pudo cargas las órdenes",
      success: null,
      data: null,
    };
  }
}
