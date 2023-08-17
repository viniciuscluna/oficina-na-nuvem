import { FuncionarioPrestador } from "../domain/funcionarioPrestador";
import { instanceApi } from "./axiosConfig";

export const getAll = async (): Promise<FuncionarioPrestador[]> => {
  return (
    await instanceApi.get<FuncionarioPrestador[]>("/prestador/funcionario")
  ).data;
};

export const add = async (
  funcionario: FuncionarioPrestador
): Promise<FuncionarioPrestador> => {
  return (
    await instanceApi.post<FuncionarioPrestador>(
      "/prestador/funcionario",
      funcionario
    )
  ).data;
};

export const edit = async (funcionario: FuncionarioPrestador): Promise<FuncionarioPrestador> => {
  return (await instanceApi.put<FuncionarioPrestador>("/prestador/funcionario", funcionario)).data;
};

export const getId = async (id: string): Promise<FuncionarioPrestador> => {
  return (await instanceApi.get<FuncionarioPrestador>(`/prestador/funcionario/${id}`)).data;
};
