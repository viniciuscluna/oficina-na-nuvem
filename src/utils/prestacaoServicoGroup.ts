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
          g[o.nome || ""].push(o); //add item to array
          return g; // be sure to return, or g will be undefined in next loop
        },
        {} //a second parameter to the reduce function, important to init the returned object
      );

    const produtosAgrupado = Object.keys(arr).map((x) => ({
      ...arr[x][0],
      qtd: arr[x].length,
    })) as Produto[];

    prestacao.groupedProducts = produtosAgrupado;
  }

  return prestacao;
};

export const syncGroupedWithProducts = (
  prestacaoServico: PrestacaoServico
): PrestacaoServico => {
  const groups = prestacaoServico.groupedProducts;
  const products = prestacaoServico.produtos;

  //Operation From Group
  groups.forEach((group) => {
    const productsFromGroup = products.filter((f) => f.nome == group.nome);
    //Add
    if (group.qtd > productsFromGroup.length) {
      const qtd = group.qtd - productsFromGroup.length;
      for (let index = 0; index < qtd; index++) {
        products.push({
          ...group,
          qtd: 1,
          id: undefined,
        });
      }
    }

    //Delete
    if (group.qtd < productsFromGroup.length) {
      const qtd = productsFromGroup.length - group.qtd;
      for (let index = 0; index < qtd; index++) {
        const idx = products.findIndex((f) => f.nome === group.nome);
        products.splice(idx, 1);
      }
    }

    //Update
    products.forEach((product) => {
      if (product.nome === group.nome) {
        product.marca = group.marca;
        product.modelo = group.modelo;
        product.data_validade = group.data_validade;
        product.garantia = group.garantia;
        product.valor_Compra = group.valor_Compra;
        product.valor_Venda = group.valor_Venda;
      }
    });
  });

  //Orphan Products
  const names = Array.from(
    new Set(
      products
        .map((f) => f.nome)
        .filter((f) => !groups.map((m) => m.nome).includes(f))
    )
  );

  names.forEach((item) => {
    const qtd = products.filter((f) => f.nome === item).length;
    for (let index = 0; index < qtd; index++) {
      const idx = products.findIndex((f) => f.nome === item);
      products.splice(idx, 1);
    }
  });

  return prestacaoServico;
};
