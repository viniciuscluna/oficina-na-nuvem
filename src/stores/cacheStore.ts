import { create } from "zustand";
import { Cliente } from "../domain/cliente";
import { Prestador } from "../domain/prestador";
import { SubServico } from "../domain/subServico";
import { Veiculo } from "../domain/veiculo";
import { Marca } from "../domain/fipe/marca";

type CacheStoreProps = {
  clientes: Cliente[];
  prestadores: Prestador[];
  subServico: SubServico[];
  veiculos: Veiculo[];
  marcas: Marca[];
  populate: (
    clientes: Cliente[],
    prestadores: Prestador[],
    subServicos: SubServico[],
    veiculos: Veiculo[],
    marcas: Marca[]
  ) => void;
};

export const useCacheStore = create<CacheStoreProps>((set) => ({
  clientes: [],
  prestadores: [],
  subServico: [],
  veiculos: [],
  marcas: [],
  populate: (clientes, prestadores, subServicos, veiculos, marcas) =>
    set({
      clientes: clientes,
      marcas: marcas,
      prestadores: prestadores,
      subServico: subServicos,
      veiculos: veiculos,
    }),
}));
