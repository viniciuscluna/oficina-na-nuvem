import { Base } from "./base";

export interface FilialServico extends Base {
    nome: string;
    observacao: string;
    logradouro: string;
    cep: string;
    numero: number;
    matriz: boolean;
    idGerente: string;
    dataDesativacao: string;
    usrCadastro: string;
    usrDesativacao: string;
}