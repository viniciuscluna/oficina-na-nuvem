import { ETipoMedidaItem } from "./ETipoMedidaItem";
import { Base } from "./base";

export interface Produto extends Base {
    nome: string;
    marca: string;
    modelo?: string;
    data_validade?: Date;
    garantia?: string;
    valor_compra: number;
    valor_venda: number;
    qtd: number;
    prestadorId: string;
    prestacaoServicoId?: string;
    tipoMedidaItem: ETipoMedidaItem;
}