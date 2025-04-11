"use server";

import type { Address } from "../models/address.model";
import type { CreateAddressDto } from "../dtos/address.dto";
import type { Response } from "@/shared/interfaces/response.interface";
import { prisma } from "@/shared/config/prisma";
import { addressMapper } from "../mappers/address.mapper";

export async function createAddress(
  userId: string,
  payload: CreateAddressDto
): Promise<Response<Address | null>> {
  try {
    const data = await prisma.address.create({
      data: { ...payload, userId },
      include: { country: true },
    });
    const address = addressMapper(data);
    return {
      error: null,
      success: "Se añadió una nueva dirección",
      data: address,
    };
  } catch {
    return {
      error: "Hubo un problema al crear la dirección",
      success: null,
      data: null,
    };
  }
}
