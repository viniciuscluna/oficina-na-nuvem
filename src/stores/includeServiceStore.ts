import { create } from "zustand";
import { PrestacaoServico } from "../domain/prestacaoServico";

type IncludeServiceProps = {
  isIncludeOpened: boolean;
  isUpdateOpened: boolean;
  prestacaoServico: PrestacaoServico | null;
  changeIsIncludeOpened: () => void;
  changeIsUpdateOpened: () => void;
  setPrestacao: (prestacao: PrestacaoServico) => void;
  clearPrestacao: () => void;
};

export const useIncludeServiceStore = create<IncludeServiceProps>((set) => ({
  isIncludeOpened: false,
  isUpdateOpened: false,
  prestacaoServico: null,
  clearPrestacao: () => set({ prestacaoServico: null }),
  setPrestacao: (prestacao: PrestacaoServico) =>
    set({ prestacaoServico: prestacao, isUpdateOpened: true }),
  changeIsIncludeOpened: () => set((state) => ({ isIncludeOpened: !state.isIncludeOpened })),
  changeIsUpdateOpened: () => set((state) => ({ isUpdateOpened: !state.isUpdateOpened })),
}));
