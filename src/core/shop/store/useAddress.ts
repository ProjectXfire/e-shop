import { persist } from "zustand/middleware";
import type { Address } from "../models/address.model";
import { create } from "zustand";

interface AddressState {
  items: Address[];
  selectedAddress: Address | null;
  setAllAddress: (list: Address[]) => void;
  setSelectedAddress: (address: Address) => void;
  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
}

export const useAddress = create<AddressState>()(
  persist(
    (set, get) => ({
      items: [],
      selectedAddress: null,
      setAllAddress: (list) => set({ items: list }),
      setSelectedAddress: (address: Address) => set({ selectedAddress: address }),
      addAddress: (address) => set({ items: [...get().items, address] }),
      removeAddress: (id) => set({ items: get().items.filter((item) => item.id !== id) }),
    }),
    { name: "address" }
  )
);
