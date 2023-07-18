import { Base } from "./base";
import { SubServico } from "./subServico";

export interface Servico extends Base{
    id?: string;
    nome: string;
    valor: number;
    subServicoId: string;
    subServico?: SubServico;
}