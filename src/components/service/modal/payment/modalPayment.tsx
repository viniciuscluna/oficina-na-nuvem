const ModalPayment = () => {

    return (
        <>
            <div className="w-[30%]">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Forma de Pagamento
                </label>
                {/* TODO: Adicionar select no hook form */}
                {/* <select className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

            </select> */}
            </div>
            <div className="w-[30%]">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Aplicar Desconto
                </label>
                {/* <input
                    type="number"
                    id="small-input"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register(`servicos.${index}.valor`)}
                ></input> */}
            </div>
            <div className="w-[30%]">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Total a pagar
                </label>
                {/* <input
                    type="number"
                    id="small-input"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register(`servicos.${index}.valor`)}
                ></input> */}
            </div>
        </>)



}

export default ModalPayment;