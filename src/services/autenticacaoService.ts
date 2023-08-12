import { instanceAuthApi } from "./axiosConfig";

import { AuthResponse } from "../types/authResponse";
import { AuthRequest } from "../types/authResquest";

export const login = async (form: AuthRequest): Promise<AuthResponse> => {
  return (await instanceAuthApi.post<AuthResponse>("/autenticacao/LoginPrestador", form))
    .data;
};
