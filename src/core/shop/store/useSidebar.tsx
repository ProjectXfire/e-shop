import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  waitAnimation: boolean;
  open: () => void;
  close: () => void;
}

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: false,
  waitAnimation: false,
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
}));
