import { EveiculoTipo } from "../domain/eVeiculoTipo";
import { DetailFipe } from "../domain/fipe/detail";
import { Marca } from "../domain/fipe/marca";
import { ModeloResponse } from "../types/modeloResponse";
import { instanceFipe } from "./axiosConfig";

const mapEndpointByTipo = (tipo: EveiculoTipo) => {
  switch (tipo) {
    case EveiculoTipo.carro:
      return "carros";
    case EveiculoTipo.caminhao:
    case EveiculoTipo.onibus:
      return "caminhoes";
    case EveiculoTipo.moto:
      return "motos";
    default:
      return "carros";
  }
};

export const getMarcas = async (tipo: EveiculoTipo): Promise<Marca[]> =>
  (await instanceFipe.get<Marca[]>(`${mapEndpointByTipo(tipo)}/marcas`)).data;

export const getModelosByMarca = async (
  tipo: EveiculoTipo,
  codigoMarca: string
): Promise<ModeloResponse> =>
  (
    await instanceFipe.get<ModeloResponse>(
      `${mapEndpointByTipo(tipo)}/marcas/${codigoMarca}/modelos`
    )
  ).data;

export const getAnosByModelosAndMarca = async (
  tipo: EveiculoTipo,
  codigoMarca: string,
  codigoModelo: string
): Promise<Marca[]> =>
  (
    await instanceFipe.get<Marca[]>(
      `${mapEndpointByTipo(
        tipo
      )}/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`
    )
  ).data;

export const getDetalheByAnosModelosAndMarca = async (
  tipo: EveiculoTipo,
  codigoMarca: string,
  codigoModelo: string,
  codigoAno: string
): Promise<DetailFipe> =>
  (
    await instanceFipe.get<DetailFipe>(
      `${mapEndpointByTipo(
        tipo
      )}/marcas/${codigoMarca}/modelos/${codigoModelo}/anos/${codigoAno}`
    )
  ).data;
