import { Produto } from "../domain/produto";
import { instanceApi } from "./axiosConfig";

export const getAll = async (
  nome: string,
  marca: string,
  modelo: string
): Promise<Produto[] | string> => {
  return (
    await instanceApi.get<Produto[] | string>("/produto", {
      params: {
        nome,
        marca,
        modelo,
      },
    })
  ).data;
};

export const getAllGroupByProduct = async (
  nome: string,
  marca: string,
  modelo: string
): Promise<Produto[] | string> => {
  return (
    await instanceApi.get<Produto[] | string>("/produto/ProdutosEstoque", {
      params: {
        nome,
        marca,
        modelo,
      },
    })
  ).data;
};

export const getInfoProduto = async (
  nome: string,
  marca: string,
  modelo: string
): Promise<Produto | string> => {
  return (
    await instanceApi.get<Produto | string>(`/produto/ProdutoInfo/${nome}/${marca}/${modelo}/`)
  ).data;
};

export const add = async (produto: Produto): Promise<Produto> => {
  return (await instanceApi.post<Produto>("/produto", produto)).data;
};

export const edit = async (produto: Produto): Promise<Produto> => {
  return (await instanceApi.put<Produto>("/produto", produto)).data;
};

export const getId = async (id: string): Promise<Produto> => {
  return (await instanceApi.get<Produto>(`/produto/${id}`)).data;
};

export const desabled = async (id: string): Promise<Produto> => {
  return (await instanceApi.put<Produto>(`/produto/DesativarProduto?id=${id}`)).data;
};

export const uploadProduct = async (files: FileList) => {
  const formData = new FormData();

  formData.append("file", files[0]);
  
  return (await instanceApi.post(`/produto/AddFromExcel`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })).data;
}