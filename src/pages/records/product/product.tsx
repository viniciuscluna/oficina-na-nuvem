import { NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getAll } from "../../../services/produtoService";
import Loader from "../../../components/loader";

const Product = () => {
  const navigate = useNavigate();
  const produtoResult = useQuery({
    queryKey: ["produto"],
    queryFn: getAll,
  });

  if (produtoResult.isLoading) <Loader />;

  return (
    <div className="flex flex-col mt-8">
      <div className="flex flex-col  gap-5">
        <div>
          <button
            type="button"
            onClick={() => navigate("add")}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Incluir
          </button>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nome
                </th>
                <th scope="col" className="px-6 py-3">
                  Marca
                </th>
                <th scope="col" className="px-6 py-3">
                  Modelo
                </th>
                <th scope="col" className="px-6 py-3">
                  Valor Venda
                </th>
                <th scope="col" className="px-6 py-3">
                  Valor Compra
                </th>
                <th scope="col" className="px-6 py-3">
                  Qtd.
                </th>
                <th scope="col" className="px-6 py-3">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {produtoResult.data?.map((produto, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {produto.nome}
                  </th>
                  <td className="px-6 py-4">{produto.marca}</td>
                  <td className="px-6 py-4">{produto.modelo}</td>
                  <td className="px-6 py-4">{produto.valor_Venda}</td>
                  <td className="px-6 py-4">{produto.valor_Compra}</td>
                  <td className="px-6 py-4">{produto.qtd}</td>
                  <td className="px-6 py-4">
                    <NavLink title="Editar" to={`edit/${produto.id}`}>
                      <svg
                        className="w-4 h-4 text-gray-800 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                      >
                        <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                        <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                      </svg>
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Product;
