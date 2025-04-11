"use server";

import type { Response } from "@/shared/interfaces/response.interface";
import { CreateProductDto } from "../dtos/product.dto";
import { uploadImages } from "./cloudinary.service";
import { prisma } from "@/shared/config/prisma";
import { auth } from "@auth";

export async function createProduct(
  payload: CreateProductDto,
  fileListImages: FileList
): Promise<Response<null>> {
  try {
    const session = await auth();
    const userId = session?.user.id;
    if (!userId) throw new Error("Usuario no autenticado");
    const product = await prisma.product.create({ data: payload });
    await uploadImages(fileListImages, product.id);
    return { error: null, success: "Producto agregado", data: null };
  } catch (error) {
    if (error instanceof Error) return { error: error.message, success: null, data: null };
    return { error: "No se pudo crear el producto", success: null, data: null };
  }
}
