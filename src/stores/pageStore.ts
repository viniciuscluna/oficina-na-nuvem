import { create } from "zustand";

type PageProps = {
  isLoading: boolean;
  changeIsLoading: (isLoading: boolean) => void;
};

export const usePageStore = create<PageProps>((set) => ({
  isLoading: false,
  changeIsLoading: (isLoading: boolean) => set({ isLoading: isLoading }),
}));
