import axios from "axios";

export const instanceApi = axios.create({
  baseURL: import.meta.env.PROD ? "TBD" : "https://localhost:7291/api",
  headers: {
    "X-API-Key": JSON.parse(localStorage.getItem("apiKey") || ""),
  },
});

export const instanceFipe = axios.create({
  baseURL: "https://parallelum.com.br/fipe/api/v1",
});
