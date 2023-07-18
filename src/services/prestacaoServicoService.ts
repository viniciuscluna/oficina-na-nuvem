import { PrestacaoServico } from "../domain/prestacaoServico";
import { instanceApi } from "./axiosConfig";

export const add = async (
  form: PrestacaoServico
): Promise<PrestacaoServico> => {
  return (await instanceApi.post<PrestacaoServico>("/prestacaoServico", form))
    .data;
};
