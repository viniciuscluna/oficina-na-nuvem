import { EPrestacaoServicoStatus } from "../domain/ePrestacaoServicoStatus";
import { PrestacaoServico } from "../domain/prestacaoServico";
import { instanceApi } from "./axiosConfig";

export const add = async (
  form: PrestacaoServico
): Promise<PrestacaoServico> => {
  const other = "other";

  if (form.clienteId === other) form.clienteId = undefined;
  if (form.veiculoId === other) form.veiculoId = undefined;

  return (await instanceApi.post<PrestacaoServico>("/prestacaoServico", form))
    .data;
};

export const getId = async (prestacaoId: string): Promise<PrestacaoServico> => {
  return (
    await instanceApi.get<PrestacaoServico>(`/prestacaoServico/${prestacaoId}`)
  ).data;
};

export const edit = async (
  form: PrestacaoServico
): Promise<PrestacaoServico> => {
  const other = "other";

  if (form.clienteId === other) form.clienteId = undefined;
  if (form.veiculoId === other) form.veiculoId = undefined;

  return (await instanceApi.put<PrestacaoServico>("/prestacaoServico", form))
    .data;
};

export const getAllByPrestador = async (
  prestadorId: string
): Promise<PrestacaoServico[]> =>
  (
    await instanceApi.get(
      `/prestacaoServico/PrestacaoServicoEnriquecidoPrestador/${prestadorId}`
    )
  ).data;

export const changeStatus = async (
  id: string,
  status: EPrestacaoServicoStatus
): Promise<void> =>
  (await instanceApi.put(`/prestacaoServico/status/${id}/${status}`)).data;
