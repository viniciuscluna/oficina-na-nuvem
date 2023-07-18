import { Base } from "./base";
import { CategoriaServico } from "./categoriaServico";

export interface SubServico extends Base {
    titulo: string;
    desc: string;
    categoriaId: string;
    categoria: CategoriaServico;
}