import type { Category } from "../models/category.model";
import type { Category as CategoryDb } from "@prisma/client";

export function categoryMapper(data: CategoryDb): Category {
  const { id, name } = data;
  const category: Category = { id, name };
  return category;
}
