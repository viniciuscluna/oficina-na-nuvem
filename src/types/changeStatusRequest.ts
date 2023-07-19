import { EPrestacaoServicoStatus } from "../domain/ePrestacaoServicoStatus";

export interface ChangeStatus {
  id: string;
  status: EPrestacaoServicoStatus;
}
