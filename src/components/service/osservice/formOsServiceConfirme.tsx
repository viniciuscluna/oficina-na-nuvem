import { UseFormRegister } from "react-hook-form";
import { PrestacaoServico } from "../../../domain/prestacaoServico";


type FormProps = {
    register: UseFormRegister<PrestacaoServico>;
}

const FormOsServiceConfirme = ({ register }: FormProps) => {
    return (
        <form className="w-full">
            <div className="grid gap-6 mb-6 md:grid-cols-2 w-full">
                <div>
                    <label htmlFor="metodoPagamento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Método Pagamento</label>
                    <select
                        className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        {...register("methodPayment.metodo")}
                    >
                        <option key="1" value="1">
                            Cartão Crédito
                        </option>
                        <option key="2" value="2">
                            Cartão Débito
                        </option>
                        <option key="3" value="3">
                            Dinheiro
                        </option>
                        <option key="4" value="4">
                            Pix
                        </option>
                        <option key="5" value="5">
                            Cheque
                        </option>
                    </select>
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="qtdParcela"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Qtd. Parcela
                    </label>
                    <input
                        {...register("methodPayment.qtdParcela")}
                        type="number"
                        id="qtdParcela"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="desconto"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Desconto %
                    </label>
                    <input
                        {...register("methodPayment.desconto")}
                        type="number"
                        id="desconto"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
            </div>
        </form>
    )
}

export default FormOsServiceConfirme;