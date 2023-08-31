import { useForm } from "react-hook-form";
import { Produto } from "../../domain/produto";

type ProductFormProps = {
  submitCallback: (produto: Produto) => void;
  backCallback: () => void;
  defaultValues?: Produto;
  label: string;
  editMode: boolean;
};

const ProdutoForm = ({
  submitCallback,
  backCallback,
  defaultValues,
  label,
  editMode,
}: ProductFormProps) => {
  const { register, handleSubmit } = useForm<Produto>({
    defaultValues: defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(submitCallback)}>
      <div className="mb-6">
        <label
          htmlFor="nome"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Nome
        </label>
        <input
          {...register("nome", { required: true })}
          type="text"
          id="nome"
          maxLength={150}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="marca"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Marca
        </label>
        <input
          {...register("marca", { required: true })}
          type="text"
          id="marca"
          maxLength={150}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="modelo"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Modelo
        </label>
        <input
          type="text"
          id="modelo"
          {...register("modelo")}
          maxLength={200}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="garantia"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Garantia
        </label>
        <input
          type="text"
          id="garantia"
          maxLength={200}
          {...register("garantia")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="valor_Compra"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Valor Compra
        </label>
        <input
          type="number"
          id="valor_Compra"
          min={0}
          {...register("valor_Compra", { valueAsNumber: true, required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="valor_Venda"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Valor Venda
        </label>
        <input
          type="number"
          id="valor_Venda"
          {...register("valor_Venda")}
          min={0}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
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
          {...register("tipoMedidaItem", { valueAsNumber: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="0">Litro</option>
          <option value="1">Peça</option>
        </select>
      </div>
      {editMode ? (
        <></>
      ) : (
        <div className="mb-6">
          <label
            htmlFor="quantidade"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Quantidade
          </label>
          <input
            type="number"
            min={1}
            id="quantidade"
            {...register("qtd", { required: true, valueAsNumber: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      )}
      <div className="mb-6">
        <label
          htmlFor="data_validade"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Data Validade
        </label>
        <input
          type="date"
          id="data_validade"
          {...register("data_validade", { valueAsDate: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={() => backCallback()}
        >
          Voltar
        </button>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {label}
        </button>
      </div>
    </form>
  );
};

export default ProdutoForm;
