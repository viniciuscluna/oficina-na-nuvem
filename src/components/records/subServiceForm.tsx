import { useForm } from "react-hook-form";
import { CategoriaServico } from "../../domain/categoriaServico";
import { SubServico } from "../../domain/subServico";

type SubServiceFormProps = {
  submitCallback: (subService: SubServico) => void;
  backCallback: () => void;
  defaultValues?: SubServico;
  categorias: CategoriaServico[];
  label: string;
};

const SubServiceForm = ({
  submitCallback,
  backCallback,
  defaultValues,
  categorias,
  label,
}: SubServiceFormProps) => {
  const { register, handleSubmit } = useForm<SubServico>({
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
          {...register("titulo", { required: true })}
          maxLength={250}
          type="text"
          id="nome"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="descricao"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Descrição
        </label>
        <input
          type="text"
          id="descricao"
          {...register("desc", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="valorServico"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Valor Serviço
        </label>
        <input
          type="number"
          id="valorServico"
          min={0}
          {...register("valorServico", { valueAsNumber: true, required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="categoria"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Categoria
        </label>
        <select
          id="categoria"
          {...register("categoriaId")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {categorias.map((categoria, index) => (
            <option key={index} value={categoria.id}>
              {categoria.titulo}
            </option>
          ))}
        </select>
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

export default SubServiceForm;
