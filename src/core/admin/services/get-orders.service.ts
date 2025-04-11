import type { OrderTable } from "@/core/payment/models/order.model";
import { orderTableAdminMapper } from "@/core/payment/mappers/order.mapper";
import { prisma } from "@/shared/config/prisma";
import { auth } from "@auth";

interface ReturnProducts {
  orders: OrderTable[];
  pages: number;
}

interface PaginationOptions {
  page?: number;
  take?: number;
}

export async function getOrders({
  page = 1,
  take = 12,
}: PaginationOptions): Promise<ReturnProducts> {
  try {
    const session = await auth();
    const userId = session?.user.id;
    if (!userId) throw new Error("Usuario no autenticado");
    if (page < 1) page = 1;
    const data = await prisma.order.findMany({
      include: { user: { select: { firstName: true, lastName: true } } },
      skip: (page - 1) * take,
      take,
    });
    const totalOrders = await prisma.order.count();
    const orders = data.map((item) => orderTableAdminMapper(item));
    return { pages: Math.ceil(totalOrders / take), orders };
  } catch {
    return { pages: 0, orders: [] };
  }
}
