import { Base } from "./base";

export interface Prestador extends Base {
    nome: string;
    cpf: string;
    cpfRepresentante?: string;
    cnpj: string;
    razaoSocial: string;
    nomeFantasia: string;
    nomeRepresentante: string;
    telefone: string;
    emailEmpresa: string;
    emailRepresentante?: string;
    situacaoCadastral?: number;
    endereco?: string;
}