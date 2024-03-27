import { useForm } from "react-hook-form";
import { FilialServico } from "../../domain/filialServico";

type OfficeFormProps = {
  submitCallback: (filial: FilialServico) => void;
  backCallback: () => void;
  defaultValues?: FilialServico;
  label: string;
};

const OfficeForm = ({
  submitCallback,
  backCallback,
  defaultValues,
  label,
}: OfficeFormProps) => {
  const { register, handleSubmit } = useForm<FilialServico>({
    defaultValues: defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(submitCallback)}>
      <div className="mb-6">
        <label
          htmlFor="nome"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Nome*
        </label>
        <input
          {...register("nome", { required: true })}
          maxLength={250}
          type="text"
          id="nome"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="logradouro"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Logradouro*
        </label>
        <input
          type="text"
          id="logradouro"
          {...register("logradouro", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="cep"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          CEP*
        </label>
        <input
          type="text"
          id="cep"
          {...register("cep", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="numero"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Número*
        </label>
        <input
          type="text"
          id="numero"
          {...register("numero", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="matriz"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Matriz?
        </label>
        <div className="flex items-center">
          <input
            {...register("matriz", { setValueAs: Boolean })}
            type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="observacao"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Observação*
        </label>
        <input
          type="text"
          id="observacao"
          {...register("observacao", { required: true })}
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

export default OfficeForm;
