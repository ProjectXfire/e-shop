import type { User } from "../models/user.model";
import type { Response } from "@/shared/interfaces/response.interface";
import bcrypt from "bcryptjs";
import { prisma } from "@/shared/config/prisma";
import { userMapper } from "../mappers/user.mapper";

export async function verifyUserAuthentication(email: string, password: string): Promise<User> {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid credentials");
    const validPassword = bcrypt.compareSync(password as string, user.password);
    if (!validPassword) throw new Error("Invalid credentials");
    return userMapper(user);
  } catch (error) {
    throw error;
  }
}

export async function verifyUserToken(email?: string | null): Promise<Response<User | null>> {
  try {
    if (!email) throw new Error("Falta enviar el email");
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Usuario no encontrado");
    return { error: null, success: "Datos cargados", data: userMapper(user) };
  } catch (error) {
    if (error instanceof Error) return { error: error.message, success: null, data: null };
    return { error: "Algo salió mal!", success: null, data: null };
  }
}
