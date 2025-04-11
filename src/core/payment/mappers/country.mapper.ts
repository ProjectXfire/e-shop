import type { Country } from "../models/country.model";
import type { Country as CountryDb } from "@prisma/client";

export function countryMapper(data: CountryDb): Country {
  const { id, name, code } = data;
  const country: Country = { id, name, code };
  return country;
}
