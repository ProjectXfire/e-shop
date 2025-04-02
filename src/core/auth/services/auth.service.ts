"use server";

import type { CreateUserDto } from "../dtos/create-user.dto";
import { Response } from "@/shared/interfaces/response.interface";
import { CredentialsSignin } from "next-auth";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@auth";
import { prisma } from "@/shared/config/prisma";

export async function withCredentials(email: string, password: string): Promise<Response<null>> {
  try {
    await signIn("credentials", { email, password, redirect: false });
    return { data: null, error: null, success: "Se inició sessión" };
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      if (error.code === "credentials")
        return { data: null, error: "Credenciales inválidas", success: null };
    }
    return { data: null, error: "Algo salió mal!", success: null };
  }
}

export async function createUser(payload: CreateUserDto): Promise<Response<null>> {
  try {
    const hashedPassword = bcrypt.hashSync(payload.password, 10);
    await prisma.user.create({ data: { ...payload, password: hashedPassword } });
    await signIn("credentials", {
      email: payload.email,
      password: payload.password,
      redirect: false,
    });
    return { data: null, error: null, success: "Se inició sessión" };
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      if (error.code === "credentials")
        return { data: null, error: "Credenciales inválidas", success: null };
    }
    return { data: null, error: "Algo salió mal!", success: null };
  }
}

export async function closeSession() {
  try {
    await signOut({ redirect: false });
    return true;
  } catch (error) {
    return false;
  }
}
