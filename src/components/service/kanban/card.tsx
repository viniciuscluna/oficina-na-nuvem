import { useMemo } from "react";

import { PrestacaoServico } from "../../../domain/prestacaoServico";
import Badge from "./badge";
import Buttons from "./buttons";
import { ChangeStatus } from "../../../types/changeStatusRequest";
import { EPrestacaoServicoStatus } from "../../../domain/ePrestacaoServicoStatus";
import ListServicos from "./listServicos";
import ListProdutos from "./listProdutos";
import { currencyFormat } from "../../../utils/currencyFormater";

type CardProps = {
  prestacao: PrestacaoServico;
  changeStatusCallback?: (changeStatus: ChangeStatus) => void;
  editCallback?: (prestacao: PrestacaoServico) => void;
};

const Card = ({ prestacao, changeStatusCallback, editCallback }: CardProps) => {
  const total = useMemo(
    () =>
      prestacao.servicos?.reduce(
        (accumulator, object) => accumulator + object.valor,
        0
      ) +
      prestacao.produtos?.reduce(
        (accumulator, object) => accumulator + object.valor_Venda,
        0
      ),
    [prestacao.servicos, prestacao.produtos]
  );

  const canEdit = useMemo(
    () =>
      prestacao.status !== EPrestacaoServicoStatus.concluido &&
      prestacao.status !== EPrestacaoServicoStatus.rejeitado,
    [prestacao.status]
  );

  const view = () => {
    window.open(`/print/${prestacao.id}`, "_blank");
  };

  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center w-full mb-2">
        <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
          {prestacao.referencia}
        </h5>
        <Badge status={prestacao.status} />
        <div className="flex gap-1">
          {canEdit && editCallback ? (
            <button
              title="Editar"
              type="button"
              onClick={() => editCallback(prestacao)}
              className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-3 h-3 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
              </svg>
            </button>
          ) : (
            <></>
          )}

          <button
            title="Visualizar"
            type="button"
            onClick={() => view()}
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-3 h-3 text-white dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5 20h10a1 1 0 0 0 1-1v-5H4v5a1 1 0 0 0 1 1Z" />
              <path d="M18 7H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-1-2V2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3h14Z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-5">
        <p className="mb-3 text-gray-700 dark:text-gray-400 ">
          <span className="font-bold">{currencyFormat(total)}</span>
        </p>
        <p className="mb-3 text-gray-700 dark:text-gray-400">
          <span className="font-bold"> Cliente:</span> {prestacao.cliente?.nome}
        </p>
        <p className="mb-3 text-gray-700 dark:text-gray-400">
          <span className="font-bold">Veículo:</span> {prestacao.veiculo?.marca}{" "}
          - {prestacao.veiculo?.modelo}
        </p>
        <p className="mb-3 text-gray-700 dark:text-gray-400">
          <span className="font-bold">Placa:</span> {prestacao.veiculo?.placa}
        </p>
      </div>
      {prestacao.servicos.length > 0 ? (
        <div className="block">
          <h4 className="text-gray-700 dark:text-gray-400 font-bold">
            Serviços
          </h4>
          <ListServicos servicos={prestacao.servicos} />
        </div>
      ) : (
        <></>
      )}
      {prestacao.produtos.length > 0 ? (
        <div className="block mt-2">
          <h4 className="text-gray-700 dark:text-gray-400 font-bold">
            Produtos
          </h4>
          <ListProdutos produtos={prestacao.produtos} />
        </div>
      ) : (
        <></>
      )}
      {changeStatusCallback ? (
        <div className="flex flex-wrap mt-4 gap-1">
          <Buttons
            status={prestacao.status}
            id={prestacao.id}
            changeStatusCallback={changeStatusCallback}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Card;
