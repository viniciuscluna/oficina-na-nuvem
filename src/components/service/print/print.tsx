import { useQuery } from "@tanstack/react-query";
import { getId } from "../../../services/prestacaoServicoService";
import Loader from "../../loader";

import "./print.scss";
import { useParams } from "react-router-dom";

const Print = () => {
  const { id } = useParams();

  const { isLoading, data } = useQuery({
    queryKey: ["prestacaoById", id],
    queryFn: () => getId(id || ""),
  });

  if (isLoading) return <Loader />;

  return (
    <section className="prestacao-print-model">
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
          <p>Data: {data?.dataCadastro?.toString()} </p>
        </div>

        <h4>INFORMAÇÕES GERAIS</h4>
        <div className="order-details">
          <p style={{ paddingLeft: "1%" }}>
            <strong>NUMERO DA ORDEM: {data?.referencia}</strong>
          </p>
          <hr />
          <p style={{ paddingLeft: "1%" }}>
            <strong>CLIENTE: {data?.cliente?.nome}</strong>
          </p>
          <hr />
          <p style={{ paddingLeft: "1%" }}>
            <strong>VEICULO: {data?.veiculo?.marca}</strong>{" "}
          </p>
          <hr />
          <p style={{ paddingLeft: "1%" }}>
            <strong>
              Modelo: {data?.veiculo?.modelo} - {data?.veiculo?.ano}
            </strong>{" "}
          </p>
          <hr />
          <p style={{ paddingLeft: "1%" }}>
            <strong>PLACA: {data?.veiculo?.placa}</strong>{" "}
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
            {data?.servicos.map((servico, index) => (
              <tr key={index}>
                <td>{servico.descricao}</td>
                <td>{servico.valor}</td>
              </tr>
            ))}

            <tr>
              <td>
                <strong>
                  Total:{" "}
                  {data?.servicos.reduce(
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
  );
};

export default Print;
