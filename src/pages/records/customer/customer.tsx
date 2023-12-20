import { useQuery } from "@tanstack/react-query";
import { getAll } from "../../../services/clienteService";
import Loader from "../../../components/loader";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Customer = () => {
  const navigate = useNavigate();
  const clienteResult = useQuery({
    queryKey: ["cliente"],
    queryFn: getAll,
  });

  const [filtroAberto, setFiltroAberto] = useState(false);

  const handleToggleFiltro = () => {
    setFiltroAberto(!filtroAberto);
  };


  if (clienteResult.isLoading) <Loader />;

  return (
    <div className="flex flex-col mt-8">
      <div className="flex flex-col  gap-5">
        {/* Barra de filtro */}
        <div className="w-full rounded-md shadow-md" >
          <div className="bg-white rounded-t-md" onClick={() => setFiltroAberto(!filtroAberto)}>
            <button
              className="flex items-center justify-between w-full p-2 bg-gray-200 rounded-md focus:outline-none"
            >
              <span>Filtro</span>
              <svg
                className={`w-4 h-4 transition-transform transform ${filtroAberto ? 'rotate-0' : 'rotate-180'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            {filtroAberto && (
              <div className="mt-4">
                {/* Aqui você pode adicionar os campos de filtro */}
                <div className="mb-4">
                  <label htmlFor="Nome" className="block text-sm font-medium text-gray-600">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    className="mt-1 p-2 border rounded-md w-full"
                    placeholder="Digite aqui"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="Cpf" className="block text-sm font-medium text-gray-600">
                    CPF
                  </label>
                  <input
                    type="text"
                    id="cpf"
                    name="cpf"
                    className="mt-1 p-2 border rounded-md w-full"
                    placeholder="Digite aqui"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                    E-mail
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="mt-1 p-2 border rounded-md w-full"
                    placeholder="Digite aqui"
                  />
                </div>
                <button className="bg-green-800 text-white px-4 py-2 rounded-md ml-auto">
                  Pesquisar
                </button>
              </div>
            )}
          </div>
        </div>
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
                  Cpf
                </th>
                <th scope="col" className="px-6 py-3">
                  E-mail
                </th>
                <th scope="col" className="px-6 py-3">
                  Endereço
                </th>
                <th scope="col" className="px-6 py-3">
                  Dat. Cadastro
                </th>
                <th scope="col" className="px-6 py-3">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {clienteResult.data?.map((cliente, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {cliente.nome}
                  </th>
                  <td>
                    {cliente.cpf}
                  </td>
                  <td>
                    {cliente.email}
                  </td>
                  <td >{cliente.endereco}</td>
                  <td>
                    {cliente.dataCadastro?.substring(0, 10)}
                  </td>
                  <td className="px-6 py-4">
                    <NavLink title="Editar" to={`edit/${cliente.id}`}>
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

export default Customer;
