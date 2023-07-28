import { useMemo } from "react";

import { PrestacaoServico } from "../../../domain/prestacaoServico";
import List from "./list";
import Badge from "./badge";
import Buttons from "./buttons";
import { ChangeStatus } from "../../../types/changeStatusRequest";
import { EPrestacaoServicoStatus } from "../../../domain/ePrestacaoServicoStatus";

type CardProps = {
  prestacao: PrestacaoServico;
  changeStatusCallback?: (changeStatus: ChangeStatus) => void;
  editCallback?: (prestacao: PrestacaoServico) => void;
};

const Card = ({
  prestacao,
  changeStatusCallback,
  editCallback,
}: CardProps) => {
  const total = useMemo(
    () =>
      prestacao.servicos?.reduce(
        (accumulator, object) => accumulator + object.valor,
        0
      ),
    [prestacao.servicos]
  );

  const canEdit = useMemo(
    () =>
      prestacao.status !== EPrestacaoServicoStatus.concluido &&
      prestacao.status !== EPrestacaoServicoStatus.rejeitado,
    [prestacao.status]
  );

  return (
    <div
      className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex justify-between items-center w-full mb-2">
        <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
          {prestacao.referencia}
        </h5>
        <Badge status={prestacao.status} />
        {canEdit && editCallback ? (
          <button
            title="Editar"
            type="button"
            onClick={() => editCallback(prestacao)}
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-3 h-3text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z"></path>
              <path d="M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z"></path>
            </svg>
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-wrap gap-x-5">
        <p className="mb-3 text-gray-700 dark:text-gray-400 ">
          <span className="font-bold">R$:</span> {total}
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
      <div className="block">
        <List servicos={prestacao.servicos} />
      </div>
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
