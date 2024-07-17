import { Base } from "./base";


export interface PagamentoServico extends Base {
    metodo: number;
    parcelamento: boolean;
    qtdParcela: number;
    taxaParcela: number;
    desconto: number;
}