import { create } from "zustand";
import { PrestacaoServico } from "../domain/prestacaoServico";

type ServiceProps = {
  servicos: PrestacaoServico[];
  setServicos: (servicos: PrestacaoServico[]) => void;
};

export const useServiceStore = create<ServiceProps>((set) => ({
  servicos: [],
  setServicos: (servicos: PrestacaoServico[]) => set({ servicos: servicos }),
}));
