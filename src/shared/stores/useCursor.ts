import { create } from "zustand";

interface CursorState {
  text: string;
  isOver: boolean;
  setIsOver: (isOver: boolean, text?: string) => void;
  setText: (text: string) => void;
  clearText: () => void;
}

export const useCursor = create<CursorState>((set) => ({
  text: "",
  isOver: false,
  setIsOver: (isOver) => set({ isOver }),
  setText: (text) => set({ text }),
  clearText: () => {
    setTimeout(() => {
      set({ text: "" });
    }, 300);
  },
}));
