import { CardResponse } from "../domain/dashboard/cardResponse";
import { PieResponse } from "../domain/dashboard/pieResponse";
import { instanceApi } from "./axiosConfig";

export const getProfit = async (): Promise<CardResponse> => {
  return (await instanceApi.get<CardResponse>("/dashboard/dashboardreceitames"))
    .data;
};

export const getClient = async (): Promise<CardResponse> => {
  return (
    await instanceApi.get<CardResponse>("/dashboard/dashboardclientesnovosmes")
  ).data;
};

export const getOS = async (): Promise<CardResponse> => {
  return (await instanceApi.get<CardResponse>("/dashboard/dashboardosmes"))
    .data;
};

export const getProduct = async (): Promise<CardResponse> => {
  return (
    await instanceApi.get<CardResponse>(
      "/dashboard/dashboardprodutosvendidosmes"
    )
  ).data;
};

export const getCategory = async (): Promise<PieResponse[]> => {
  return (
    await instanceApi.get<PieResponse[]>(
      "/dashboard/dashboardcategoriaagrupado"
    )
  ).data;
};

export const getSubCategory = async (): Promise<PieResponse[]> => {
  return (
    await instanceApi.get<PieResponse[]>(
      "/dashboard/dashboardsubcategoriaagrupado"
    )
  ).data;
};

export const getDiaryProfit = async (): Promise<PieResponse[]> => {
  return (
    await instanceApi.get<PieResponse[]>(
      "/dashboard/dashboardfaturamentodiario"
    )
  ).data;
};
