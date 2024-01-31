import { create } from "zustand";

type PageProps = {
  isPending: boolean;
  changeisPending: (isPending: boolean) => void;
};

export const usePageStore = create<PageProps>((set) => ({
  isPending: false,
  changeisPending: (isPending: boolean) => set({ isPending: isPending }),
}));
