import type { Address } from "../models/address.model";

export function addressMapper(data: Record<string, any>): Address {
  const { id, firstName, lastName, address, postalCode, city, country, phone } = data;

  const deliveryAddress: Address = {
    id,
    firstName,
    lastName,
    address,
    postalCode,
    city,
    country,
    phone,
  };
  return deliveryAddress;
}
