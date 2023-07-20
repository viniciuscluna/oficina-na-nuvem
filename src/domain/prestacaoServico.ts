import { Base } from "./base";
import { Cliente } from "./cliente";
import { EPrestacaoServicoStatus } from "./ePrestacaoServicoStatus";
import { Prestador } from "./prestador";
import { Servico } from "./servico";
import { Veiculo } from "./veiculo";

export interface PrestacaoServico extends Base {
    referencia: string;
    status: EPrestacaoServicoStatus;
    prestador: Prestador;
    prestadorId?: string;
    cliente: Cliente;
    clienteId: string;
    veiculo: Veiculo;
    veiculoId?: string;
    servicos: Servico[];
}