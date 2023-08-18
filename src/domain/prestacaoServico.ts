import { Base } from "./base";
import { Cliente } from "./cliente";
import { EPrestacaoServicoStatus } from "./ePrestacaoServicoStatus";
import { FuncionarioPrestador } from "./funcionarioPrestador";
import { Prestador } from "./prestador";
import { Produto } from "./produto";
import { Servico } from "./servico";
import { Veiculo } from "./veiculo";

export interface PrestacaoServico extends Base {
    referencia: string;
    status: EPrestacaoServicoStatus;
    dataConclusaoServico: Date;
    prestador?: Prestador;
    prestadorId?: string;
    cliente?: Cliente;
    clienteId?: string;
    veiculo?: Veiculo;
    veiculoId?: string;
    funcionarioPrestador?: FuncionarioPrestador;
    funcionarioPrestadorId?: string;
    servicos: Servico[];
    produtos: Produto[];
    groupedProducts: Produto[];
}