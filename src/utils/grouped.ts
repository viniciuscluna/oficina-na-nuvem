import { PrestacaoServico } from "../domain/prestacaoServico";
import { Produto } from "../domain/produto";

export const returnGroupedPrestacaoServico = (
  prestacao: PrestacaoServico
): PrestacaoServico => {
  const produtos = prestacao.produtos;
  if (produtos.length > 0) {
    const arr =
      produtos &&
      produtos.reduce(
        (g: { [id: string]: Produto[] }, o: Produto) => {
          g[o.nome || ""] = g[o.nome || ""] || []; //check if key allready exists, else init a new array
          g[o.nome || ""].push({ ...o }); //add item to array
          return g; // be sure to return, or g will be undefined in next loop
        },
        {} //a second parameter to the reduce function, important to init the returned object
      );

    const produtosAgrupado = Object.keys(arr).map((x) => ({
      ...arr[x][0],
      qtd: arr[x].length,
    })) as Produto[];

    prestacao.produtosGrouped = JSON.parse(JSON.stringify(produtosAgrupado));
  }

  return prestacao;
};
