import { Base } from "./base";

export interface FuncionarioPrestador extends Base {
    nome: string;
    telefone: string;
    email: string;
    rg: string;
    cpf: string;
    endereco: string;
    cargo: string;
}