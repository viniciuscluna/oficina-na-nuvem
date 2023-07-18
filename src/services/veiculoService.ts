import { Veiculo } from "../domain/veiculo";
import { instanceApi } from "./axiosConfig";

export const getAll = async (): Promise<Veiculo[]> => {
  return (await instanceApi.get<Veiculo[]>("/veiculo")).data;
};
