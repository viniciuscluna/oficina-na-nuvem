import { Base } from "./base";

export interface Cliente extends Base {
    nome: string;
    rg?: string;
    cpf: string;
    endereco: string;
    telefone?: string;
    email?: string;
}