"use server";

import type { Response } from "@/shared/interfaces/response.interface";
import type { User } from "../models/user.model";
import { auth } from "@auth";
import { prisma } from "@/shared/config/prisma";
import { userMapper } from "../mappers/user.mapper";

interface Values {
  firstName?: string;
  lastName?: string;
  role?: "admin" | "user";
  image?: string;
  token?: string;
}

export async function updateUser(userId: string, values: Values): Promise<Response<User | null>> {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user) throw new Error("Usuario no autenticado");
    if (user.role !== "admin") throw new Error("Usuario no tiene permisos");
    const data = await prisma.user.update({
      where: { id: userId },
      data: values,
    });
    return { error: null, success: "Usuario actualizado", data: userMapper(data) };
  } catch (error) {
    if (error instanceof Error) return { error: error.message, success: null, data: null };
    return { error: "No se pudo actualizar al usuario", success: null, data: null };
  }
}

export async function updateTokenUser(token?: string): Promise<boolean> {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user) return false;
    await prisma.user.update({
      where: { id: user.id },
      data: { token: token ?? null },
    });
    return true;
  } catch {
    return false;
  }
}
