import { SubServico } from "../domain/subServico";
import { instanceApi } from "./axiosConfig";

export const getAll = async (): Promise<SubServico[]> => {
  return (await instanceApi.get<SubServico[]>("/subServico")).data;
};

export const add = async (subServico: SubServico): Promise<SubServico> => {
  return (await instanceApi.post<SubServico>("/subServico", subServico)).data;
};
