"use server";

import { prisma } from "@/shared/config/prisma";
import type { Response } from "@/shared/interfaces/response.interface";
import { auth } from "@auth";

interface Fields {
  transactionId?: string;
  isPaid?: boolean;
  paidAt?: Date;
}

export async function updateOrder(orderId: string, fields: Fields): Promise<Response<null>> {
  try {
    const session = await auth();
    const userId = session?.user.id;
    if (!userId) throw new Error("Usuario no autenticado");
    const { isPaid, paidAt, transactionId } = fields;
    await prisma.order.update({
      where: { id: orderId, userId },
      data: { isPaid, paidAt, transactionId },
    });
    return {
      error: null,
      success: "Order actualizada",
      data: null,
    };
  } catch (error) {
    if (error instanceof Error)
      return {
        error: error.message,
        success: null,
        data: null,
      };
    return {
      error: "No se pudo actualizar la order",
      success: null,
      data: null,
    };
  }
}
