import type { Response } from "@/shared/interfaces/response.interface";
import type { OrderTable } from "../models/order.model";
import { prisma } from "@/shared/config/prisma";
import { auth } from "@auth";
import { orderTableMapper } from "../mappers/order.mapper";

export async function getOrdersByUser(): Promise<Response<OrderTable[] | null>> {
  try {
    const session = await auth();
    const userId = session?.user.id;
    if (!userId) throw new Error("Usuario no autenticado");
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("Usuario no encontrado");
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
    if (error instanceof Error)
      return {
        error: error.message,
        success: null,
        data: null,
      };
    return {
      error: "No se pudo cargas las órdenes",
      success: null,
      data: null,
    };
  }
}
