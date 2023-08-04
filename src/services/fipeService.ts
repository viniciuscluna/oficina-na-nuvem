import { Marca } from "../domain/fipe/marca";
import { ModeloResponse } from "../types/modeloResponse";
import { instanceFipe } from "./axiosConfig";

export const getMarcas = async (): Promise<Marca[]> =>
  (await instanceFipe.get<Marca[]>("carros/marcas")).data;

export const getModelosByMarca = async (
  codigoMarca: string
): Promise<ModeloResponse> =>
  (
    await instanceFipe.get<ModeloResponse>(
      `carros/marcas/${codigoMarca}/modelos`
    )
  ).data;

export const getAnosByModelosAndMarca = async (
  codigoMarca: string,
  codigoModelo: string
): Promise<Marca[]> =>
  (
    await instanceFipe.get<Marca[]>(
      `carros/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`
    )
  ).data;
