"use server";

import type { Country } from "../models/country.model";
import type { Response } from "@/shared/interfaces/response.interface";
import { prisma } from "@/shared/config/prisma";
import { countryMapper } from "../mappers/country.mapper";

export async function getCountries(): Promise<Response<Country[]>> {
  try {
    const data = await prisma.country.findMany();
    const countries = data.map((item) => countryMapper(item));
    return {
      error: null,
      success: "Se cargaron los paises",
      data: countries,
    };
  } catch (error) {
    return {
      error: "Hubo un problema al cargar los paises",
      success: null,
      data: [],
    };
  }
}
