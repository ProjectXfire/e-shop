import type { Country } from "./country.model";

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
  city: string;
  countryId: string;
  country: Country;
  phone: string;
}
