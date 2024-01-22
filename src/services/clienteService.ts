import { Cliente } from "../domain/cliente";
import { instanceApi } from "./axiosConfig";

export const getAll = async (nome: string, cpf: string, email: string): Promise<Cliente[] | string> => {
  return (await instanceApi.get<Cliente[] | string>("/cliente", {
    params: {
      nome,
      cpf,
      email
    }
  })).data;
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

export const desabled = async (id: string): Promise<Cliente> => {
  return (await instanceApi.put<Cliente>(`/cliente/DesativarCliente?id=${id}`)).data;
};