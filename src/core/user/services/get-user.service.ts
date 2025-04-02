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
    if (!email) return { error: "Falta enviar el email", success: null, data: null };
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { error: "Usuario no encontrado", success: null, data: null };
    return { error: null, success: "Datos cargados", data: userMapper(user) };
  } catch (error) {
    return { error: "Algo salió mal!", success: null, data: null };
  }
}
