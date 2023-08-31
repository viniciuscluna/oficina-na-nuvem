import { FieldArrayWithId, UseFormRegister } from "react-hook-form";

import { PrestacaoServico } from "../../../domain/prestacaoServico";

type ProdutoFormProps = {
  produtos: FieldArrayWithId<PrestacaoServico, "servicos" | "produtos", "id">[];
  register: UseFormRegister<PrestacaoServico>;
  removeServicoCallback: (index: number) => void;
  arrayName: "groupedProducts" | "produtos";
};

const ProdutoForm = ({
  produtos,
  register,
  arrayName,
  removeServicoCallback,
}: ProdutoFormProps) => {
  return (
    <>
      {produtos.map((__, index) => (
        <div
          key={index}
          className="flex w-full justify-between flex-wrap border border-gray-200 rounded-lg shadow dark:border-gray-600 rounded-lg p-4 gap-4"
        >
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nome
            </label>
            <input
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              maxLength={150}
              {...register(`${arrayName}.${index}.nome`, { required: true })}
            ></input>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Marca
            </label>
            <input
              type="text"
              id="small-input"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              maxLength={150}
              {...register(`${arrayName}.${index}.marca`, { required: true })}
            ></input>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Modelo
            </label>
            <input
              type="text"
              id="small-input"
              maxLength={200}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register(`${arrayName}.${index}.modelo`)}
            ></input>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Data Validade
            </label>
            <input
              type="date"
              id="small-input"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register(`${arrayName}.${index}.data_validade`, {
                valueAsDate: true,
              })}
            ></input>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Garantia
            </label>
            <input
              type="text"
              id="small-input"
              maxLength={200}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register(`${arrayName}.${index}.garantia`)}
            ></input>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Valor Compra
            </label>
            <input
              type="number"
              id="small-input"
              min={0}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register(`${arrayName}.${index}.valor_Compra`, {
                valueAsNumber: true,
                required: true,
              })}
            ></input>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Valor Venda
            </label>
            <input
              type="number"
              id="small-input"
              min={0}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register(`${arrayName}.${index}.valor_Venda`, {
                valueAsNumber: true,
                required: true,
              })}
            ></input>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Quantidade
            </label>
            <input
              type="number"
              id="small-input"
              min={1}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register(`${arrayName}.${index}.qtd`, {
                required: true,
                valueAsNumber: true,
              })}
            ></input>
          </div>
          <div className="mb-6">
            <label
              htmlFor="tipoMedida"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tipo Medida
            </label>
            <select
              id="tipoMedida"
              {...register(`${arrayName}.${index}.tipoMedidaItem`, {
                valueAsNumber: true,
              })}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="0">Litro</option>
              <option value="1">Peça</option>
            </select>
          </div>
          <button
            type="button"
            onClick={() => removeServicoCallback(index)}
            className="px-3 py-1 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Remover
          </button>
        </div>
      ))}
    </>
  );
};

export default ProdutoForm;
