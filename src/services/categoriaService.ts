import { CategoriaServico } from "../domain/categoriaServico";
import { instanceApi } from "./axiosConfig";

export const getAll = async (
  titulo: string,
  descricao: string
): Promise<CategoriaServico[] | string> => {
  return (
    await instanceApi.get<CategoriaServico[] | string>("/categoriaServico", {
      params: {
        titulo: titulo,
        desc: descricao,
      },
    })
  ).data;
};

export const add = async (
  categoria: CategoriaServico
): Promise<CategoriaServico> => {
  return (
    await instanceApi.post<CategoriaServico>("/categoriaServico", categoria)
  ).data;
};

export const edit = async (
  categoria: CategoriaServico
): Promise<CategoriaServico> => {
  return (
    await instanceApi.put<CategoriaServico>("/categoriaServico", categoria)
  ).data;
};

export const getId = async (id: string): Promise<CategoriaServico> => {
  return (await instanceApi.get<CategoriaServico>(`/categoriaServico/${id}`))
    .data;
};

export const desabled = async (
  id: string
): Promise<CategoriaServico> => {
  return (
    await instanceApi.put<CategoriaServico>(`/categoriaServico/DesativarCategoria?id=${id}`)
  ).data;
};
