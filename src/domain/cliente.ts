import { Base } from "./base";

export interface Cliente extends Base {
    nome: string;
    telefone?: string;
    email?: string;
}