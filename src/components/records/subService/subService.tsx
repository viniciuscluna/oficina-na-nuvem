import { useQuery } from "@tanstack/react-query";
import { getAll } from "../../../services/subServicoService";
import Loader from "../../loader";
import { useNavigate } from "react-router-dom";

const SubService = () => {
  const navigate = useNavigate();
  const subServicoResult = useQuery({
    queryKey: ["subServico"],
    queryFn: getAll,
  });

  if (subServicoResult.isLoading) <Loader />;

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
                  Titulo
                </th>
                <th scope="col" className="px-6 py-3">
                  Descrição
                </th>
                <th scope="col" className="px-6 py-3">
                  Categoria
                </th>
              </tr>
            </thead>
            <tbody>
              {subServicoResult.data?.map((subServico, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {subServico.titulo}
                  </th>
                  <td className="px-6 py-4">{subServico.desc}</td>
                  <td className="px-6 py-4">{subServico.categoria.titulo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubService;
