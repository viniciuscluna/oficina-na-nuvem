import { Cliente } from "../domain/cliente";
import { instanceApi } from "./axiosConfig";

export const getAll = async (): Promise<Cliente[]> => {
  return (await instanceApi.get<Cliente[]>("/cliente")).data;
};
