import { create } from "zustand";

type PageProps = {
  isLoading: boolean;
  prestadorId: string;
  changeIsLoading: (isLoading: boolean) => void;
  changePrestadorId: (prestadorId: string) => void;
};

export const usePageStore = create<PageProps>((set) => ({
  isLoading: false,
  prestadorId: "",
  changeIsLoading: (isLoading: boolean) => set({ isLoading: isLoading }),
  changePrestadorId: (prestadorId: string) => set({ prestadorId: prestadorId }),
}));
