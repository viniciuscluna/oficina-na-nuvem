import { Base } from "./base";
import { EveiculoTipo } from "./eVeiculoTipo";

export interface Veiculo extends Base {
    placa: string;
    marca: string;
    modelo: string;
    tipo: EveiculoTipo;
}