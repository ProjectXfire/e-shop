"use server";

import type { Address } from "../models/address.model";
import type { Response } from "@/shared/interfaces/response.interface";
import { prisma } from "@/shared/config/prisma";
import { addressMapper } from "../mappers/address.mapper";

export async function getAddressLissByUser(userId?: string): Promise<Response<Address[] | null>> {
  if (!userId) throw new Error("Usuario no autenticado");
  try {
    const data = await prisma.address.findMany({ where: { userId }, include: { country: true } });
    const addressList = data.map((item) => addressMapper(item));
    return {
      error: null,
      success: "Se cargaron las direcciones",
      data: addressList,
    };
  } catch (error) {
    if (error instanceof Error)
      return {
        error: error.message,
        success: null,
        data: null,
      };
    return {
      error: "Hubo un problema al cargar las direcciones",
      success: null,
      data: null,
    };
  }
}
