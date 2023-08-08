import { forwardRef } from "react";

import { PrestacaoServico } from "../../../domain/prestacaoServico";

import "./componentPrint.scss";

type ComponentPrintProp = {
  prestacao: PrestacaoServico;
};

const ComponentPrint = forwardRef<HTMLElement, ComponentPrintProp>(
  ({ prestacao }: ComponentPrintProp, ref) => (
    <section className="prestacao-print-model" ref={ref}>
      <div>
        <img
          src="caminho/do/seu/logo.png"
          alt="Logo da Minha Empresa"
          className="logo"
        />
      </div>

      <div style={{ marginTop: "-6%", marginLeft: "60%" }}>
        <p>
          Rua Cyro Maia de Carvalho, 284 - JD das Palmas /SP 05749-270.
          <br />
          (11) 98349-4218.
          <br />
          avr_autoservice@outlook.com.
        </p>
      </div>

      <div className="container">
        <div className="header">
          <h1>ORDEM DE SERVIÇO</h1>
          <p>Data: {prestacao?.dataCadastro?.toString()} </p>
        </div>

        <h4>INFORMAÇÕES GERAIS</h4>
        <div className="order-details">
          <p style={{ paddingLeft: "1%" }}>
            <strong>NUMERO DA ORDEM: {prestacao?.referencia}</strong>
          </p>
          <hr />
          <p style={{ paddingLeft: "1%" }}>
            <strong>CLIENTE: {prestacao?.cliente?.nome}</strong>
          </p>
          <hr />
          <p style={{ paddingLeft: "1%" }}>
            <strong>VEICULO: {prestacao?.veiculo?.marca}</strong>{" "}
          </p>
          <hr />
          <p style={{ paddingLeft: "1%" }}>
            <strong>
              Modelo: {prestacao?.veiculo?.modelo} - {prestacao?.veiculo?.ano}
            </strong>{" "}
          </p>
          <hr />
          <p style={{ paddingLeft: "1%" }}>
            <strong>PLACA: {prestacao?.veiculo?.placa}</strong>{" "}
          </p>
        </div>

        <h4>SERVIÇÕS REALIZADOS</h4>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {prestacao?.servicos.map((servico, index) => (
              <tr key={index}>
                <td>{servico.descricao}</td>
                <td>{servico.valor}</td>
              </tr>
            ))}

            <tr>
              <td>
                <strong>
                  Total:{" "}
                  {prestacao?.servicos.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.valor,
                    0
                  )}{" "}
                </strong>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <br />
        <h4>PRODUTOS UTILIDADOS</h4>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Valor Unitario</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>

        <div className="footer">
          <p>Este é um modelo de ordem de serviço.</p>
        </div>
      </div>
    </section>
  )
);

export default ComponentPrint;
