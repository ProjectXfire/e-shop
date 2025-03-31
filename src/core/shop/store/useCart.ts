import type { CartDto } from "../dtos/cart.dto";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  items: CartDto[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: CartDto) => void;
  updateQuantity: (id: string, quantity: number) => void;
  deleteItem: (id: string) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      addItem: (item) =>
        set((state) => {
          const existInCart = state.items.some((itemCart) => itemCart.id === item.id);
          if (!existInCart) {
            const cloneCart = structuredClone(state.items);
            cloneCart.push(item);
            const totalItems = cloneCart.reduce((total, item) => total + item.quantity, 0);
            const totalPrice = cloneCart.reduce(
              (total, item) => total + item.quantity * item.price,
              0
            );
            return { ...state, items: cloneCart, totalItems, totalPrice };
          }
          const updatedCart = state.items.map((itemCart) =>
            itemCart.id === item.id
              ? { ...itemCart, quantity: itemCart.quantity + item.quantity }
              : itemCart
          );
          const totalItems = updatedCart.reduce((total, item) => total + item.quantity, 0);
          const totalPrice = updatedCart.reduce(
            (total, item) => total + item.quantity * item.price,
            0
          );
          return { ...state, items: updatedCart, totalItems, totalPrice };
        }),
      updateQuantity: (id, quantity) =>
        set((state) => {
          const cloneCart = structuredClone(state.items).map((cartItem) =>
            cartItem.id === id ? { ...cartItem, quantity } : cartItem
          );
          const totalItems = cloneCart.reduce((total, item) => total + item.quantity, 0);
          const totalPrice = cloneCart.reduce(
            (total, item) => total + item.quantity * item.price,
            0
          );
          return { ...state, items: cloneCart, totalPrice, totalItems };
        }),
      deleteItem: (id) =>
        set((state) => {
          const cloneCart = structuredClone(state.items).filter((cartItem) => cartItem.id !== id);
          const totalItems = cloneCart.reduce((total, item) => total + item.quantity, 0);
          const totalPrice = cloneCart.reduce(
            (total, item) => total + item.quantity * item.price,
            0
          );
          return { ...state, items: cloneCart, totalItems, totalPrice };
        }),
    }),
    { name: "cart" }
  )
);
