import { useQuery } from "@tanstack/react-query";
import { getDashUltimosOs } from "../../services/dashboardService";
import { cpfFormater } from "../../utils/cpfFormater";
import { currencyFormat } from "../../utils/currencyFormater";

import LoadingIndicator from "../loadingIndicator";

const RecentlySold = () => {

    const formatCpf = cpfFormater;
    const formatMoeda = currencyFormat;

    const { isPending, data } = useQuery({
        queryKey: ["dash/lastos"],
        queryFn: getDashUltimosOs,
      });
      if (isPending) return <LoadingIndicator />;

    return (
        <div className='p-2 w-full overflow-auto'>
            <h5 className='text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                Ultimos Serviços
            </h5>
            <br />
            <table className='w-full text-left rtl:text-right border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-white uppercase bg-[#1a3a31] dark:bg-[#121b2e] dark:text-gray-400'>
                    <tr>
                        <th className='h-full text-center py-4 text-gray-200 font-medium'>
                            Cat. Serviço
                        </th>
                        <th className='h-full text-center py-4 text-gray-200 font-medium'>
                            Cpf
                        </th>
                        <th className='h-full text-center py-4 text-gray-200 font-medium'>
                            Valor Serviço
                        </th>
                        <th className='h-full text-center py-4 text-gray-200 font-medium'>
                            Valor Produto
                        </th>
                        <th className='h-full text-center py-4 text-gray-200 font-medium'>
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                {data instanceof Array ? data?.map((servico, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={index}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {servico.servicoCategoria}
                    </th>
                    <td className="px-6 py-4">{formatCpf(servico.cpf)}</td>
                    <td className="px-6 py-4">{formatMoeda(servico.valorServico)}</td>
                    <td className="px-6 py-4">{formatMoeda(servico.valorProduto)}</td>
                    <td className="px-6 py-4">{formatMoeda(servico.total)}</td>
                  </tr>
                )) : <></>}
                </tbody>
            </table>

        </div>

    );
};

export default RecentlySold;