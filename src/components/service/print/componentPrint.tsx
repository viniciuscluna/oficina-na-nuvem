import { forwardRef, useMemo } from "react";

import { PrestacaoServico } from "../../../domain/prestacaoServico";
import { Produto } from "../../../domain/produto";
import { ETipoMedidaItem } from "../../../domain/ETipoMedidaItem";
import { currencyFormat } from "../../../utils/currencyFormater";

import "./componentPrint.scss";

const DEFAULT_LOGO = 'https://i.imgur.com/Xbxq1f2.png';

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
              g[o.nome || ""] = g[o.nome || ""] || []; //check if key allready exists, else init a new array
              g[o.nome || ""].push(o); //add item to array
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
              src={prestacao.prestador?.logo ?? DEFAULT_LOGO}
              alt="Logo da Minha Empresa"
              className="logo"
            />
            <p>
              {prestacao.prestador?.endereco}
              <br />
              {prestacao.prestador?.telefone}
              <br />
              <b>{prestacao.prestador?.emailEmpresa}</b>
            </p>
          </section>

          <div className="container">
            <table className="order-details">
              <th style={{ textAlign: "center" }} colSpan={2}>
                <h4>{prestacao.prestador?.nome} ({prestacao.referencia})</h4>
              </th>
              <tr>
                <td><b>Cliente:</b> {prestacao.cliente?.nome}</td>
                <td>
                  <b>Início do seviço:</b>{" "}
                  {new Date(prestacao.dataCadastro || "")?.toLocaleDateString(
                    "en-GB"
                  )}
                </td>
              </tr>
              <tr>
                <td><b>Veículo: </b>{prestacao?.veiculo?.marca}</td>
                <td><b>Término do serviço:</b> {" "}
                  {prestacao.dataConclusaoServico ? new Date(prestacao.dataConclusaoServico || "")?.toLocaleDateString(
                    "en-GB"
                  ) : ''}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Modelo:</b> {prestacao?.veiculo?.modelo} -{" "}
                  {prestacao?.veiculo?.ano}
                </td>
                <td><b>Km:</b> {prestacao.veiculo?.km || "-"}</td>
              </tr>
              <tr>
                <td><b>Placa:</b> {prestacao.veiculo?.placa}</td>
                <td><b>Telefone:</b> {prestacao.cliente?.telefone}</td>
              </tr>
            </table>

            {/* Serviços */}
            <table>
              <th style={{ textAlign: "center" }} colSpan={2}>
                <h4>Serviços realizados</h4>
              </th>
              <tbody>
                <tr>
                  <th>Descriminação de serviço</th>
                  <th>Valor (R$) </th>
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
                      <td>{currencyFormat(servico.valor)}</td>
                    </tr>
                  );
                })}

                <tr>
                  <td colSpan={2}>
                    <strong>Total:</strong> {currencyFormat(totalServico)}
                  </td>
                </tr>
              </tbody>
            </table>
            <br></br>
            {/* Produtos */}
            <table>
              <table>
                <th style={{ textAlign: "center" }} colSpan={5}>
                  <h4>Peças e acessórios</h4>
                </th>
                <tr>
                  <th>Qtd.</th>
                  <th>Un.</th>
                  <th>Peças</th>
                  <th>Unitário (R$)</th>
                  <th>Total (R$)</th>
                </tr>
                <tbody>
                  {Object.keys(produtoAgrupado).map((produto, index) => {
                    const arr = produtoAgrupado[produto];
                    const first = arr[0];
                    const total =
                      arr.reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue.valor_Venda,
                        0
                      ) || 0;
                    return (
                      <tr key={index}>
                        <td>{arr.length}</td>
                        <td>
                          {first.tipoMedidaItem === ETipoMedidaItem.Litro
                            ? "Litro"
                            : "Peça"}
                        </td>
                        <td>
                          {first.marca} - {first.modelo}
                        </td>
                        <td>{currencyFormat(first.valor_Venda)}</td>
                        <td>{currencyFormat(total)}</td>
                      </tr>
                    );
                  })}

                  <tr>
                    <td colSpan={5}>
                      <strong>Total:</strong> {currencyFormat(totalProduto)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </table>

            <br />
            <div className="details-total">
              <p style={{ paddingLeft: "1%" }}>
                <strong>Peças: </strong>{currencyFormat(totalProduto)}
              </p>
              <hr />
              <p style={{ paddingLeft: "1%" }}>
                <strong>Serviços:</strong> {currencyFormat(totalServico)}
              </p>
              <hr />
              <p style={{ paddingLeft: "1%" }}>
                <strong>Total:</strong> {currencyFormat(totalProduto + totalServico)}
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
