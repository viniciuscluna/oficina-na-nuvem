import { useForm } from "react-hook-form";
import { Cliente } from "../../domain/cliente";
import { useHookFormMask } from "use-mask-input";

type CustomerFormProps = {
  submitCallback: (cliente: Cliente) => void;
  backCallback: () => void;
  defaultValues?: Cliente;
  label: string;
};

const CustomerForm = ({
  submitCallback,
  backCallback,
  defaultValues,
  label,
}: CustomerFormProps) => {
  const { register, handleSubmit } = useForm<Cliente>({
    defaultValues: defaultValues,
  });

  const registerWithMask = useHookFormMask(register);

  return (
    <form onSubmit={handleSubmit(submitCallback)}>
     <div className="grid gap-4 mb-6 md:grid-cols-4 w-full">
      <div className="mb-6">
        <label
          htmlFor="nome"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Nome*
        </label>
        <input
          {...register("nome", {
            required: true,
          })}
          type="text"
          id="nome"
          maxLength={125}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="rg"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          RG 
        </label>
        <input
          {...registerWithMask("rg", ["99999999-9"])}
          type="text"
          id="rg"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="cpf"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          CPF*
        </label>
        <input
          {...registerWithMask("cpf", "cpf", {
            required: true,
          })}
          type="text"
          id="cpf"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="telefone"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Telefone*
        </label>
        <input
          {...registerWithMask("telefone", ["(99) [9]9999-9999"], {
            required: true,
          })}
          type="text"
          id="telefone"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      </div>
      <div className="grid gap-2 mb-6 md:grid-cols-2 w-full">
       <div className="mb-6">
        <label
          htmlFor="endereco"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Endereço*
        </label>
        <input
          {...register("endereco", {
            required: true,
          })}
          type="text"
          id="endereco"
          maxLength={250}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
       </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email*
        </label>
        <input
          {...registerWithMask("email", "email", {
            required: true,
          })}
          type="text"
          id="email"
          maxLength={250}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
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

export default CustomerForm;
