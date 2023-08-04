export interface Produto {
    nome: string;
    marca: string;
    modelo?: string;
    data_validade?: Date;
    garantia?: string;
    valor_compra: number;
    valor_venda: number;
    quantidade: number;
    prestadorId: string;
    prestacaoServicoId?: string;
}