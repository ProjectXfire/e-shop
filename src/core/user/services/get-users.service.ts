"use server";

import type { User } from "../models/user.model";
import { userMapper } from "../mappers/user.mapper";
import { prisma } from "@/shared/config/prisma";
import { auth } from "@auth";

interface ReturnProducts {
  users: User[];
  pages: number;
}

interface PaginationOptions {
  page?: number;
  take?: number;
}

export async function getUsers({
  page = 1,
  take = 12,
}: PaginationOptions): Promise<ReturnProducts> {
  try {
    const session = await auth();
    const userId = session?.user.id;
    if (!userId) throw new Error("Usuario no autenticado");
    if (page < 1) page = 1;
    const data = await prisma.user.findMany({
      skip: (page - 1) * take,
      take,
    });
    const totalUsers = await prisma.user.count();
    const users = data.map((item) => userMapper(item));
    return { pages: Math.ceil(totalUsers / take), users };
  } catch {
    return { pages: 0, users: [] };
  }
}
