import { useState, useEffect } from "react";

import classNames from "classnames";

import { Produto } from "../../../domain/produto";
import { currencyFormat } from "../../../utils/currencyFormater";

type ListProps = {
  produtos: Produto[];
};
export interface GroupedProduct {
  products: Produto[];
  isOpened: boolean;
  key: string;
}

const ListProdutos = ({ produtos }: ListProps) => {
  const [produtosList, setProdutosList] = useState<GroupedProduct[]>([]);

  useEffect(() => {
    const produtoAgrupado =
      (produtos &&
        produtos.reduce(
          (g: { [id: string]: Produto[] }, o: Produto) => {
            g[o.nome || ""] = g[o.nome || ""] || []; //check if key allready exists, else init a new array
            g[o.nome || ""].push(o); //add item to array
            return g; // be sure to return, or g will be undefined in next loop
          },
          {} //a second parameter to the reduce function, important to init the returned object
        )) ||
      [];

    const list = Object.keys(produtoAgrupado).map((x) => ({
      key: x,
      isOpened: false,
      products: produtoAgrupado[x],
    })) as GroupedProduct[];

    setProdutosList(list);
  }, [produtos, setProdutosList]);

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
        const first = produto.products[0];
        const total = produto.products.reduce(
          (accumulator, object) => accumulator + object.valor_Venda,
          0
        );

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
                  {first.marca} - {first.modelo} - Total {currencyFormat(total)} (Qtd: {produto.products.length})
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
                  <strong>Valor de compra: (unitário) </strong> {currencyFormat(first.valor_Compra)}
                </p>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  <strong>Nome: </strong> {first.nome}
                </p>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  <strong>Garantia: </strong> {first.garantia}
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
