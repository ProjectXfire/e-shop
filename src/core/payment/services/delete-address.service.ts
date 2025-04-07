"use server";

import type { Response } from "@/shared/interfaces/response.interface";
import { prisma } from "@/shared/config/prisma";

export async function removeAddress(addressId: string, userId: string): Promise<Response<null>> {
  try {
    await prisma.address.delete({ where: { id: addressId, userId } });
    return { error: null, success: "Se eliminó la dirección", data: null };
  } catch (error) {
    return { error: "No se pudo eliminar la dirección", success: null, data: null };
  }
}
