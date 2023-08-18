import axios from "axios";
import { STORAGE_KEY } from "../constants/key";

export const instanceApi = axios.create({
  baseURL: import.meta.env.PROD ? "https://smart-oficina-api.azurewebsites.net/api" : "https://localhost:7291/api",
  headers: {
    Authorization: `Bearer ${JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "{}"
    )}`,
  },
});

export const instanceAuthApi = axios.create({
  baseURL: import.meta.env.PROD ? "https://smart-oficina-api-auth.azurewebsites.net/api" : "https://localhost:7056/api",
});

export const instanceFipe = axios.create({
  baseURL: "https://parallelum.com.br/fipe/api/v1",
});
