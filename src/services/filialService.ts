import { FilialServico } from "../domain/filialServico";
import { instanceApi } from "./axiosConfig";

export const getAll = async (
  nome: string,
  logradouro: string
): Promise<FilialServico[] | string> => {
  return (
    await instanceApi.get<FilialServico[] | string>("/filial", {
      params: {
        nome: nome,
        logradouro: logradouro,
      },
    })
  ).data;
};

export const add = async (
  request: FilialServico
): Promise<FilialServico> => {
  return (
    await instanceApi.post<FilialServico>("/filial", request)
  ).data;
};

export const edit = async (
    request: FilialServico
): Promise<FilialServico> => {
  return (
    await instanceApi.put<FilialServico>("/filial", request)
  ).data;
};

export const getId = async (id: string): Promise<FilialServico> => {
  return (await instanceApi.get<FilialServico>(`/filial/${id}`))
    .data;
};

export const desabled = async (
  id: string
): Promise<FilialServico> => {
  return (
    await instanceApi.put<FilialServico>(`/filial/DesativarFilial?id=${id}`)
  ).data;
};
