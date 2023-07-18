import { Prestador } from "../domain/prestador";
import { instanceApi } from "./axiosConfig";

export const getAll = async (): Promise<Prestador[]> => {
  return (await instanceApi.get<Prestador[]>("/prestador")).data;
};
