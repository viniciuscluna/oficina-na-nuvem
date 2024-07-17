import { Base } from "./base";
import { Veiculo } from "./veiculo";

export interface Cliente extends Base {
    nome: string;
    rg?: string;
    cpf: string;
    endereco: string;
    telefone?: string;
    email?: string;
    carros: Veiculo[]
}