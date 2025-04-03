"use server";

import type { Address } from "../models/address.model";
import type { Response } from "@/shared/interfaces/response.interface";
import { prisma } from "@/shared/config/prisma";
import { addressMapper } from "../mappers/address.mapper";

export async function getAddressLissByUser(userId?: string): Promise<Response<Address[] | null>> {
  if (!userId)
    return {
      error: "Usuario no autenticado",
      success: null,
      data: null,
    };
  try {
    const data = await prisma.address.findMany({ where: { userId } });
    const addressList = data.map((item) => addressMapper(item));
    return {
      error: null,
      success: "Se cargaron las direcciones",
      data: addressList,
    };
  } catch (error) {
    return {
      error: "Hubo un problema al cargar las direcciones",
      success: null,
      data: null,
    };
  }
}
