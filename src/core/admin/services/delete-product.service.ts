"use server";

import { prisma } from "@/shared/config/prisma";
import type { Response } from "@/shared/interfaces/response.interface";
import { auth } from "@auth";
import { removeImageFromCloudinary } from "./cloudinary.service";

export async function deleteProduct(
  productId: string,
  imagesUrls: string[]
): Promise<Response<null>> {
  try {
    const session = await auth();
    const userId = session?.user.id;
    if (!userId) throw new Error("Usuario no autenticado");
    await prisma.product.delete({ where: { id: productId } });
    for (const image of imagesUrls) {
      await removeImageFromCloudinary(image);
    }
    return { error: null, success: "Producto eliminado", data: null };
  } catch (error) {
    if (error instanceof Error) return { error: error.message, success: null, data: null };
    return { error: "No se pudo eliminar el producto", success: null, data: null };
  }
}
