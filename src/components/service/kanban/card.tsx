import { useMemo } from "react";

import { PrestacaoServico } from "../../../domain/prestacaoServico";
import List from "./list";
import Badge from "./badge";
import Buttons from "./buttons";
import { ChangeStatus } from "../../../types/changeStatusRequest";

type CardProps = {
  prestacao: PrestacaoServico;
  keyProp: number;
  changeStatusCallback: (changeStatus: ChangeStatus) => void;
};

const Card = ({ prestacao, keyProp, changeStatusCallback }: CardProps) => {
  const total = useMemo(
    () =>
      prestacao.servicos?.reduce(
        (accumulator, object) => accumulator + object.valor,
        0
      ),
    [prestacao.servicos]
  );

  return (
    <div
      key={keyProp}
      className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex justify-between w-full mb-2">
        <a href="#">
          <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
            {prestacao.referencia}
          </h5>
        </a>
        <Badge status={prestacao.status} />
      </div>
      <div className="flex flex-wrap gap-x-5">
        <p className="mb-3 text-gray-700 dark:text-gray-400 ">
          <span className="font-bold">R$:</span> {total}
        </p>
        <p className="mb-3 text-gray-700 dark:text-gray-400">
          <span className="font-bold"> Cliente:</span> {prestacao.cliente?.nome}
        </p>
        <p className="mb-3 text-gray-700 dark:text-gray-400">
          <span className="font-bold">Veículo:</span> {prestacao.veiculo.marca}{" "}
          - {prestacao.veiculo.modelo}
        </p>
        <p className="mb-3 text-gray-700 dark:text-gray-400">
          <span className="font-bold">Placa:</span> {prestacao.veiculo.placa}
        </p>
      </div>
      <div className="block">
        <List servicos={prestacao.servicos} />
      </div>
      <div className="flex flex-wrap mt-4 gap-1">
        <Buttons
          status={prestacao.status}
          id={prestacao.id}
          changeStatusCallback={changeStatusCallback}
        />
      </div>
    </div>
  );
};

export default Card;
