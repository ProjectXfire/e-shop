import type { Response } from "@/shared/interfaces/response.interface";
import type { Category } from "../models/category.model";
import { prisma } from "@/shared/config/prisma";
import { categoryMapper } from "../mappers/category.mapper";

export async function getCategories(): Promise<Response<Category[] | null>> {
  try {
    const data = await prisma.category.findMany();
    const categories = data.map((item) => categoryMapper(item));
    return {
      error: null,
      success: "Categorías cargadas",
      data: categories,
    };
  } catch {
    return {
      error: "No se pudo cargar las categorías",
      success: null,
      data: null,
    };
  }
}
