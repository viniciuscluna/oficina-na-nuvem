import { Base } from "./base";
import { SubServico } from "./subServico";

export interface Servico extends Base{
    id?: string;
    descricao: string;
    valor: number;
    subServicoId: string;
    subCategoriaServico?: SubServico;
}