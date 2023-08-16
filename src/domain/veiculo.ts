import { Base } from "./base";
import { EveiculoTipo } from "./eVeiculoTipo";

export interface Veiculo extends Base {
    placa: string;
    marca: string;
    modelo: string;
    chassi?: string;
    ano?: number;
    anoSelect?: string;
    km?: string;
    tipoCombustivel?: string;
    tipo: EveiculoTipo;
}