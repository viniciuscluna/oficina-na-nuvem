import { create } from "zustand";

type IncludeServiceProps = {
  isOpened: boolean;
  changeIsOpened: () => void;
};

export const useIncludeServiceStore = create<IncludeServiceProps>((set) => ({
  isOpened: false,
  changeIsOpened: () => set((state) => ({ isOpened: !state.isOpened })),
}));
