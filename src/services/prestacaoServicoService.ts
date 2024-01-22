import { EPrestacaoServicoStatus } from "../domain/ePrestacaoServicoStatus";
import { PrestacaoServico } from "../domain/prestacaoServico";
import { returnGroupedPrestacaoServico } from "../utils/prestacaoServicoGroup";
import { onlyNumber } from "../utils/numberFormater";
import { instanceApi } from "./axiosConfig";

const mapPrestacaoServico = (
  prestacaoServico: PrestacaoServico
): PrestacaoServico => {
  const other = "other";

  if (prestacaoServico.clienteId === other) {
    prestacaoServico.clienteId = undefined;
    if (prestacaoServico.cliente) {
      prestacaoServico.cliente.cpf = onlyNumber(prestacaoServico.cliente.cpf);
      prestacaoServico.cliente.rg = onlyNumber(prestacaoServico.cliente.rg);
      prestacaoServico.cliente.telefone = onlyNumber(
        prestacaoServico.cliente.telefone
      );
    }
  }

  if (prestacaoServico.veiculoId === other)
    prestacaoServico.veiculoId = undefined;

  return prestacaoServico;
};

export const add = async (form: PrestacaoServico): Promise<PrestacaoServico> =>
  (
    await instanceApi.post<PrestacaoServico>(
      "/prestacaoServico",
      mapPrestacaoServico(form)
    )
  ).data;

export const getId = async (prestacaoId: string): Promise<PrestacaoServico> => {
  const result = await instanceApi.get<PrestacaoServico>(
    `/prestacaoServico/${prestacaoId}`
  );

  return { ...returnGroupedPrestacaoServico(result.data) };
};

export const edit = async (form: PrestacaoServico): Promise<PrestacaoServico> =>
  (
    await instanceApi.put<PrestacaoServico>(
      "/prestacaoServico",
      mapPrestacaoServico(form)
    )
  ).data;

export const getAllInProgress = async (): Promise<PrestacaoServico[]> => {
  const result = await instanceApi.get<PrestacaoServico[]>(
    `/prestacaoServico/PrestacaoServicoAbertoPrestador`
  );
  return result.data;
};

export const getAllInDone = async (): Promise<PrestacaoServico[]> => {
  const result = await instanceApi.get<PrestacaoServico[]>(
    `/prestacaoServico/PrestacaoServicoFechadosPrestador`
  );
  return result.data;
};

export const changeStatus = async (
  id: string,
  status: EPrestacaoServicoStatus
): Promise<void> =>
  (await instanceApi.put(`/prestacaoServico/status/${id}/${status}`)).data;

  export const desabled = async (id: string): Promise<PrestacaoServico> =>
  (
    await instanceApi.put<PrestacaoServico>(
      `/prestacaoServico/DesativarPrestacao?id=${id}`)
  ).data;