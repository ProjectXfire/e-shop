import { create } from "zustand";

interface DeleteModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  waitAnimation: boolean;
  action: (() => void) | null;
  setAction: (action: () => void) => void;
}

export const useDeleteModal = create<DeleteModalState>((set) => ({
  isOpen: false,
  waitAnimation: false,
  action: null,
  open: () => {
    set({ waitAnimation: true });
    setTimeout(() => {
      set({ isOpen: true });
    }, 0);
  },
  close: () => {
    set({ isOpen: false });
    setTimeout(() => {
      set({ waitAnimation: false });
    }, 300);
  },
  setAction: (action) => set({ action }),
}));
