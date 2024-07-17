import { Veiculo } from "../domain/veiculo";
import { instanceApi } from "./axiosConfig";

export const getAll = async (): Promise<Veiculo[]> => {
  return (await instanceApi.get<Veiculo[]>("/veiculo")).data;
};

export const getCarCustomer = async (id: string): Promise<Veiculo> => {
  return (await instanceApi.get<Veiculo>(`/veiculo/RetornarCarro/${id}`)).data;
};
