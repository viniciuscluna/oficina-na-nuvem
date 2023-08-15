import { useState, useEffect, useMemo } from "react";

import classNames from "classnames";

import { Produto } from "../../../domain/produto";

type ListProps = {
  produtos: Produto[];
};

interface ProdutoList extends Produto {
  isOpened: boolean;
}

const ListProdutos = ({ produtos }: ListProps) => {
  const [produtosList, setProdutosList] = useState<ProdutoList[]>(
    produtos as ProdutoList[]
  );

  useEffect(
    () => setProdutosList(produtos as ProdutoList[]),
    [produtos, setProdutosList]
  );

  const openMenu = (index: number) => {
    const list = [...produtosList];
    list[index].isOpened = !list[index].isOpened;
    setProdutosList(list);
  };

  return (
    <div
      id="accordion-flush"
      data-accordion="collapse"
      data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      data-inactive-classes="text-gray-500 dark:text-gray-400"
    >
      {produtosList.map((produto, index) => {
        const isOpened = produto.isOpened;
        return (
          <div key={index}>
            <h3>
              <button
                type="button"
                className={classNames(
                  "flex items-center justify-between w-full font-medium text-left py-1 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400",
                  isOpened
                    ? "text-gray-900"
                    : "text-gray-500"
                )}
                aria-expanded={isOpened}
                onClick={() => openMenu(index)}
              >
                <span>
                  {produto.marca} - {produto.modelo} - {produto.valor_Venda}
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
                  <strong>Valor Compra: </strong> {produto.valor_Compra}
                </p>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  <strong>Nome: </strong> {produto.nome}
                </p>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  <strong>Garantia: </strong> {produto.garantia}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListProdutos;
