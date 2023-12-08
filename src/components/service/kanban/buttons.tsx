import { EPrestacaoServicoStatus } from "../../../domain/ePrestacaoServicoStatus";
import { ChangeStatus } from "../../../types/changeStatusRequest";

type ButtonsProps = {
  status: EPrestacaoServicoStatus;
  changeStatusCallback: (changeStatus: ChangeStatus) => void;
  id?: string;
};

const Buttons = ({ id, status, changeStatusCallback }: ButtonsProps) => {
  switch (status) {
    case EPrestacaoServicoStatus.aberto:
      return (
        <>
          <button
            type="button"
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() =>
              changeStatusCallback({
                id: id || "",
                status: EPrestacaoServicoStatus.analise,
              })
            }
          >
            Enviar para análise
          </button>
          <button
            type="button"
            className="px-3 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() =>
              changeStatusCallback({
                id: id || "",
                status: EPrestacaoServicoStatus.rejeitado,
              })
            }
          >
            Cancelar
          </button>
        </>
      );
    case EPrestacaoServicoStatus.analise:
      return (
        <>
          <button
            type="button"
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() =>
              changeStatusCallback({
                id: id || "",
                status: EPrestacaoServicoStatus.aprovado,
              })
            }
          >
            Aprovar
          </button>
          <button
            type="button"
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() =>
              changeStatusCallback({
                id: id || "",
                status: EPrestacaoServicoStatus.rejeitado,
              })
            }
          >
            Rejeitar
          </button>
        </>
      );
    case EPrestacaoServicoStatus.aprovado:
      return (
        <>
          <button
            type="button"
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() =>
              changeStatusCallback({
                id: id || "",
                status: EPrestacaoServicoStatus.andamento,
              })
            }
          >
            Enviar para andamento
          </button>
          <button
            type="button"
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() =>
              changeStatusCallback({
                id: id || "",
                status: EPrestacaoServicoStatus.rejeitado,
              })
            }
          >
            Cancelar
          </button>
        </>
      );
    case EPrestacaoServicoStatus.andamento:
      return (
        <>
          <button
            type="button"
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() =>
              changeStatusCallback({
                id: id || "",
                status: EPrestacaoServicoStatus.teste,
              })
            }
          >
            Enviar para testes
          </button>
          <button
            type="button"
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() =>
              changeStatusCallback({
                id: id || "",
                status: EPrestacaoServicoStatus.rejeitado,
              })
            }
          >
            Cancelar
          </button>
        </>
      );

    case EPrestacaoServicoStatus.teste:
      return (
        <>
          <button
            type="button"
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() =>
              changeStatusCallback({
                id: id || "",
                status: EPrestacaoServicoStatus.concluido,
              })
            }
          >
            Concluir
          </button>
          <button
            type="button"
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() =>
              changeStatusCallback({
                id: id || "",
                status: EPrestacaoServicoStatus.rejeitado,
              })
            }
          >
            Cancelar
          </button>
        </>
      );
    default:
      return <></>;
  }
};

export default Buttons;
