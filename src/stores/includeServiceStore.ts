import { create } from "zustand";

type IncludeServiceProps = {
  isIncludeOpened: boolean;
  isUpdateOpened: boolean;
  updateQuery: boolean;
  prestacaoServicoId: string | null;
  changeIsIncludeOpened: () => void;
  changeIsUpdateOpened: () => void;
  setPrestacaoId: (prestacaoId: string) => void;
  setUpdateQuery: (updateQuery: boolean) => void;
  clearPrestacao: () => void;
};

export const useIncludeServiceStore = create<IncludeServiceProps>((set) => ({
  isIncludeOpened: false,
  isUpdateOpened: false,
  updateQuery: false,
  prestacaoServicoId: null,
  clearPrestacao: () => set({ prestacaoServicoId: null }),
  setPrestacaoId: (prestacaoId: string) =>
    set({ prestacaoServicoId: prestacaoId, isUpdateOpened: true }),
  changeIsIncludeOpened: () =>
    set((state) => ({ isIncludeOpened: !state.isIncludeOpened })),
  changeIsUpdateOpened: () =>
    set((state) => {
      if (state.isUpdateOpened)
        return {
          isUpdateOpened: !state.isUpdateOpened,
          prestacaoServicoId: null,
        };
      else return { isUpdateOpened: !state.isUpdateOpened };
    }),
  setUpdateQuery: (updateQuery: boolean) => set({ updateQuery: updateQuery }),
}));
