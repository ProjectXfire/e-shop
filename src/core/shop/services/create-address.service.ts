"use server";

import type { Address } from "../models/address.model";
import type { createAddressDto } from "../dtos/address.dto";
import type { Response } from "@/shared/interfaces/response.interface";
import { prisma } from "@/shared/config/prisma";
import { addressMapper } from "../mappers/address.mapper";

export async function createAddress(
  userId: string,
  payload: createAddressDto
): Promise<Response<Address | null>> {
  try {
    const data = await prisma.address.create({ data: { ...payload, userId } });
    const address = addressMapper(data);
    return {
      error: null,
      success: "Se añadió una nueva dirección",
      data: address,
    };
  } catch (error) {
    return {
      error: "Hubo un problema al crear la dirección",
      success: null,
      data: null,
    };
  }
}
