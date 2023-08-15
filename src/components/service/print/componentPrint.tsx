import { forwardRef, useMemo } from "react";

import { PrestacaoServico } from "../../../domain/prestacaoServico";

import "./componentPrint.scss";
import { Produto } from "../../../domain/produto";

type ComponentPrintProp = {
  prestacao: PrestacaoServico;
};

const ComponentPrint = forwardRef<HTMLElement, ComponentPrintProp>(
  ({ prestacao }: ComponentPrintProp, ref) => {
    const totalServico = useMemo(
      () =>
        prestacao?.servicos?.reduce(
          (accumulator, currentValue) => accumulator + currentValue.valor,
          0
        ) || 0,
      [prestacao.servicos]
    );

    const totalProduto = useMemo(
      () =>
        prestacao?.produtos?.reduce(
          (accumulator, currentValue) => accumulator + currentValue.valor_Venda,
          0
        ) || 0,
      [prestacao.produtos]
    );

    const produtoAgrupado = useMemo(
      () =>
        (prestacao.produtos &&
          prestacao.produtos.reduce(
            (g: { [id: string]: Produto[] }, o: Produto) => {
              g[o.modelo || ""] = g[o.modelo || ""] || []; //check if key allready exists, else init a new array
              g[o.modelo || ""].push(o); //add item to array
              return g; // be sure to return, or g will be undefined in next loop
            },
            {} //a second parameter to the reduce function, important to init the returned object
          )) ||
        [],
      [prestacao.produtos]
    );
    return (
      <section className="prestacao-print-model" ref={ref}>
        <main>
          <section className="header_document">
            <img
              src={`/logos/${prestacao.prestadorId}.png`}
              alt="Logo da Minha Empresa"
              className="logo"
            />
            <p>
              {prestacao.prestador?.endereco}
              <br />
              {prestacao.prestador?.telefone}
              <br />
              {prestacao.prestador?.emailEmpresa}
            </p>
          </section>

          <div className="container">
            <table className="order-details">
              <th style={{ textAlign: "center" }} colSpan={2}>
                <h4>{prestacao.prestador?.nome}</h4>
              </th>
              <tr>
                <td>CLIENTE: {prestacao.cliente?.nome}</td>
                <td>INICIO DO SERVIÇO: {new Date(prestacao.dataCadastro || '')?.toLocaleDateString('en-GB')}</td>
              </tr>
              <tr>
                <td>VEICULO: {prestacao?.veiculo?.marca}</td>
                <td>TÉRMINO DO SERVIÇO:</td>
              </tr>
              <tr>
                <td>
                  MODELO: {prestacao?.veiculo?.modelo} -{" "}
                  {prestacao?.veiculo?.ano}
                </td>
                <td>KM: -</td>
              </tr>
              <tr>
                <td>PLACA: {prestacao.veiculo?.placa}</td>
                <td>TELEFONE: {prestacao.cliente?.telefone}</td>
              </tr>
            </table>

            {/* Serviços */}
            <table>
              <th style={{ textAlign: "center" }} colSpan={2}>
                <h4>SERVIÇOS REALIZADOS</h4>
              </th>
              <tbody>
                <tr>
                  <th>DESCRIMININAÇÃO DE SERVIÇO</th>
                  <th>VALOR R$</th>
                </tr>
                {prestacao.servicos?.map((servico, index) => {
                  const descr =
                    servico.descricao +
                    "\n" +
                    servico.subCategoriaServico?.desc +
                    "\n" +
                    servico.subCategoriaServico?.categoria.titulo;
                  return (
                    <tr key={index}>
                      <td className="whitespace-pre-line">{descr}</td>
                      <td>R$ {servico.valor}</td>
                    </tr>
                  );
                })}

                <tr>
                  <td colSpan={2}>
                    <strong>Total: {totalServico}</strong>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Produtos */}
            <table>
              <table>
                <th style={{ textAlign: "center" }} colSpan={5}>
                  <h4>PEÇAS E ACESSÓRIOS</h4>
                </th>
                <tr>
                  <th>QTD</th>
                  <th>UN.</th>
                  <th>PEÇAS</th>
                  <th>UNITÁRIO R$</th>
                  <th>TOTAL R$</th>
                </tr>
                <tbody>
                  {Object.keys(produtoAgrupado).map((produto, index) => {
                    const arr = produtoAgrupado[produto];
                    const first = arr[0];
                    const total = arr.reduce(
                      (accumulator, currentValue) => accumulator + currentValue.valor_Venda,
                      0
                    ) || 0
                    return (
                      <tr key={index}>
                        <td>{arr.length}</td>
                        <td>{first.tipoMedidaItem.toString()}</td>
                        <td>{first.marca} - {first.modelo}</td>
                        <td>{first.valor_Venda}</td>
                        <td>{total}</td>
                      </tr>
                    );
                  })}

                  <tr>
                    <td colSpan={5}>
                      <strong>Total: {totalProduto}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </table>

            <br />
            <div className="details-total">
              <p style={{ paddingLeft: "1%" }}>
                <strong>PEÇAS: {totalProduto}</strong>
              </p>
              <hr />
              <p style={{ paddingLeft: "1%" }}>
                <strong>SERVIÇOS: {totalServico}</strong>{" "}
              </p>
              <hr />
              {/* <p style={{ paddingLeft: "1%" }}>
                <strong>A PAGAR:</strong>{" "}
              </p>
              <hr />
              <p style={{ paddingLeft: "1%" }}>
                <strong>PAGO:</strong>{" "}
              </p>
              <hr />
              <p style={{ paddingLeft: "1%" }}>
                <strong>A PAGAR:</strong>{" "}
              </p>
              <hr /> */}
            </div>

            <footer className="footer">
              <p>Documento gerado pelo Smart Oficina 😎</p>
            </footer>
          </div>
        </main>
      </section>
    );
  }
);
export default ComponentPrint;
