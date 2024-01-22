import { FuncionarioPrestador } from "../domain/funcionarioPrestador";
import { onlyNumber } from "../utils/numberFormater";
import { instanceApi } from "./axiosConfig";

export const getAll = async (
  cpf: string,
  nome: string,
  email: string
): Promise<FuncionarioPrestador[] | string> => {
  return (
    await instanceApi.get<FuncionarioPrestador[] | string>("/prestador/funcionario", {
      params: {
        cpf: cpf,
        nome: nome,
        email: email
      }
    })
  ).data;
};

const mapFuncionario = (
  funcionario: FuncionarioPrestador
): FuncionarioPrestador => {
  funcionario.cpf = onlyNumber(funcionario.cpf);
  funcionario.rg = onlyNumber(funcionario.rg);
  funcionario.telefone = onlyNumber(funcionario.telefone);

  return funcionario;
};

export const add = async (
  funcionario: FuncionarioPrestador
): Promise<FuncionarioPrestador> =>
  (
    await instanceApi.post<FuncionarioPrestador>(
      "/prestador/funcionario",
      mapFuncionario(funcionario)
    )
  ).data;

export const edit = async (
  funcionario: FuncionarioPrestador
): Promise<FuncionarioPrestador> =>
  (
    await instanceApi.put<FuncionarioPrestador>(
      "/prestador/funcionario",
      mapFuncionario(funcionario)
    )
  ).data;

export const getId = async (id: string): Promise<FuncionarioPrestador> => {
  return (
    await instanceApi.get<FuncionarioPrestador>(`/prestador/funcionario/${id}`)
  ).data;
};

export const desabled = async (
  id: string
): Promise<FuncionarioPrestador> =>
  (
    await instanceApi.put<FuncionarioPrestador>(
      `/prestador/DesativarFuncionario?id=${id}`)
  ).data;