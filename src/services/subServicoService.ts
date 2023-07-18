import { SubServico } from "../domain/subServico";
import { instanceApi } from "./axiosConfig";

export const getAll = async (): Promise<SubServico[]> => {
  return (await instanceApi.get<SubServico[]>("/subServico")).data;
};
