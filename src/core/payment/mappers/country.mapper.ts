import type { Country } from "../models/country.model";

export function countryMapper(data: Record<string, any>): Country {
  const { id, name, code } = data;

  const country: Country = {
    id,
    name,
    code,
  };
  return country;
}
