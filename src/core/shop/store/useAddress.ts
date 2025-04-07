import { persist } from "zustand/middleware";
import type { Address } from "../../payment/models/address.model";
import { create } from "zustand";

interface AddressState {
  selectedAddress: Address | null;
  setSelectedAddress: (address: Address) => void;
}

export const useAddress = create<AddressState>()(
  persist(
    (set) => ({
      selectedAddress: null,
      setSelectedAddress: (address: Address) => set({ selectedAddress: address }),
    }),
    { name: "address" }
  )
);
