import type { Address } from "../models/address.model";
import type { Address as AddressDb } from "@prisma/client";

interface AddressDbWithJoin extends AddressDb {
  country: { id: string; name: string; code: string };
}

export function addressMapper(data: AddressDbWithJoin): Address {
  const { id, firstName, lastName, address, postalCode, city, countryId, country, phone } = data;

  const deliveryAddress: Address = {
    id,
    firstName,
    lastName,
    address,
    postalCode,
    city,
    country,
    countryId,
    phone,
  };
  return deliveryAddress;
}
