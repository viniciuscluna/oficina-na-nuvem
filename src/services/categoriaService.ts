import { CategoriaServico } from "../domain/categoriaServico";
import { instanceApi } from "./axiosConfig";

export const getAll = async (): Promise<CategoriaServico[]> => {
  return (await instanceApi.get<CategoriaServico[]>("/categoriaServico")).data;
};

export const add = async (
  categoria: CategoriaServico
): Promise<CategoriaServico> => {
  return (
    await instanceApi.post<CategoriaServico>("/categoriaServico", categoria)
  ).data;
};
