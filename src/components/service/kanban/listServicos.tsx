import { useState, useEffect } from "react";

import classNames from "classnames";

import { Servico } from "../../../domain/servico";
import { currencyFormat } from "../../../utils/currencyFormater";

type ListProps = {
  servicos: Servico[];
};

interface ServicoList extends Servico {
  isOpened: boolean;
}

const ListServicos = ({ servicos }: ListProps) => {
  const [servicosList, setServicosList] = useState<ServicoList[]>(
    servicos as ServicoList[]
  );

  useEffect(
    () => setServicosList(servicos as ServicoList[]),
    [servicos, setServicosList]
  );

  const openMenu = (index: number) => {
    const list = [...servicosList];
    list[index].isOpened = !list[index].isOpened;
    setServicosList(list);
  };

  return (
    <div
      id="accordion-flush"
      data-accordion="collapse"
      data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      data-inactive-classes="text-gray-500 dark:text-gray-400"
    >
      {servicosList.map((servico, index) => {
        const isOpened = servico.isOpened;
        return (
          <div key={index}>
            <h3>
              <button
                type="button"
                className={classNames(
                  "flex items-center justify-between w-full font-medium text-left py-1 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400",
                  isOpened ? "text-gray-900" : "text-gray-500"
                )}
                aria-expanded={isOpened}
                onClick={() => openMenu(index)}
              >
                <span>
                  {servico.subCategoriaServico?.categoria.titulo} -{" "}
                  {servico.subCategoriaServico?.titulo}
                </span>
                <svg
                  data-accordion-icon
                  className={classNames(
                    "w-3 h-3 shrink-0",
                    isOpened ? "rotate-180" : ""
                  )}
                  aria-hidden={!isOpened}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h3>
            <div className={isOpened ? "" : "hidden"}>
              <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  <strong>Serviço executado: </strong> {servico.descricao}
                </p>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  <strong>Valor {currencyFormat(servico.valor)}</strong>
                </p>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  <strong>Sobre o que se refere: </strong>{" "}
                  {servico.subCategoriaServico?.desc}
                </p>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  <strong>Sobre o tipo de serviço que se refere: </strong>{" "}
                  {servico.subCategoriaServico?.categoria.desc}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListServicos;
