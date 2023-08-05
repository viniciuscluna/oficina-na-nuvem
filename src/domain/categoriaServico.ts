import { Base } from "./base";

export interface CategoriaServico extends Base {
    titulo: string;
    desc: string;
    prestadorId: string;
}