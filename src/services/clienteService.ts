import { Cliente } from "../domain/cliente";
import { instanceApi } from "./axiosConfig";

export const getAll = async (): Promise<Cliente[]> => {
  return (await instanceApi.get<Cliente[]>("/cliente")).data;
};

export const add = async (
  cliente: Cliente
): Promise<Cliente> => {
  return (
    await instanceApi.post<Cliente>("/cliente", cliente)
  ).data;
};

export const edit = async (cliente: Cliente): Promise<Cliente> => {
  return (await instanceApi.put<Cliente>("/cliente", cliente)).data;
};

export const getId = async (id: string): Promise<Cliente> => {
  return (await instanceApi.get<Cliente>(`/cliente/${id}`)).data;
};
