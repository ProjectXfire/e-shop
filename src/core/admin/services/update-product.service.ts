"use server";

import type { Response } from "@/shared/interfaces/response.interface";
import type { UpdateProductDto } from "../dtos/product.dto";
import { prisma } from "@/shared/config/prisma";
import { removeImageFromCloudinary, uploadImages } from "./cloudinary.service";
import { auth } from "@auth";

export async function updateProductFeatures(productId: string, payload: UpdateProductDto) {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user || user.role !== "admin") throw new Error("No tiene permisos");
    await prisma.product.update({ where: { id: productId }, data: payload });
    return { error: null, success: "Se actualizó el producto", data: null };
  } catch (error) {
    if (error instanceof Error) return { error: error.message, success: null, data: null };
    return { error: "No se pudo actualizar el producto", success: null, data: null };
  }
}

export async function updateProductImages(
  files: FileList,
  productId: string
): Promise<Response<null>> {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user || user.role !== "admin") throw new Error("No tiene permisos");
    const images = await uploadImages(files, productId);
    await prisma.productImage.createMany({ data: images });
    return { error: null, success: "Se guardaron las imágenes", data: null };
  } catch (error) {
    if (error instanceof Error) return { error: error.message, success: null, data: null };
    return { error: "No se guardas las imágenes", success: null, data: null };
  }
}

export async function deleteImage(productId: string, imageUrl: string): Promise<Response<null>> {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user || user.role !== "admin") throw new Error("No tiene permisos");
    await removeImageFromCloudinary(imageUrl);
    await prisma.productImage.delete({ where: { productId, url: imageUrl } });
    return { error: null, success: "Se eliminó la imágen", data: null };
  } catch (error) {
    if (error instanceof Error) return { error: error.message, success: null, data: null };
    return { error: "No se pudo eliminar la imágen", success: null, data: null };
  }
}
