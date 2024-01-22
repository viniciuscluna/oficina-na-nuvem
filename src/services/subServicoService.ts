import { SubServico } from "../domain/subServico";
import { instanceApi } from "./axiosConfig";

export const getAll = async (

  titulo: string,
  desc: string

): Promise<SubServico[]> => {
  return (await instanceApi.get<SubServico[]>("/subServico", {
    params: {
      titulo: titulo,
      desc: desc
    }
  })).data;
};

export const add = async (subServico: SubServico): Promise<SubServico> => {
  return (await instanceApi.post<SubServico>("/subServico", subServico)).data;
};

export const edit = async (subServico: SubServico): Promise<SubServico> => {
  return (await instanceApi.put<SubServico>("/subServico", subServico)).data;
};

export const getId = async (id: string): Promise<SubServico> => {
  return (await instanceApi.get<SubServico>(`/subServico/${id}`)).data;
};
