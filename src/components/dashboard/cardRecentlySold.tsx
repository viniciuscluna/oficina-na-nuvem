const RecentlySold = () => {
    return(
       <div className='p-2 w-full overflow-auto'>
            <h5 className='text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                Ultimos Serviços
            </h5>
            <br />
            <table className='w-full text-left rtl:text-right border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-white uppercase bg-[#1a3a31] dark:bg-[#121b2e] dark:text-gray-400'>
                    <tr>
                        <th className='h-full text-center py-4 text-gray-200 font-medium'>
                            Produto
                        </th>
                        <th className='h-full text-center py-4 text-gray-200 font-medium'>
                            Valor Compra
                        </th>
                        <th className='h-full text-center py-4 text-gray-200 font-medium'>
                            Valor Venda
                        </th>
                        <th className='h-full text-center py-4 text-gray-200 font-medium'>
                            Peso
                        </th>
                        <th className='h-full text-center py-4 text-gray-200 font-medium'>
                            Quant.
                        </th>
                        <th className='h-full text-center py-4 text-gray-200 font-medium'>
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <td className='text-center py-2'>
                        Motor
                    </td>
                    <td className='text-center py-2'>
                       R$ 5000,00
                    </td>
                    <td className='text-center py-2'>
                        R$ 10500,00
                    </td>
                    <td className='text-center py-2'>
                        369
                    </td>
                    <td className='text-center py-2'>
                         1
                    </td>
                    <td className='text-center py-2'>
                        R$ 11,00
                    </td>
                </tbody>
            </table>

       </div>

    );
};

export default RecentlySold;