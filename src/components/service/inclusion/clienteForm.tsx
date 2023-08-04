import { UseFormRegister } from "react-hook-form";
import { PrestacaoServico } from "../../../domain/prestacaoServico";

type ClienteFormProps = {
  register: UseFormRegister<PrestacaoServico>;
};

const ClienteForm = ({ register }: ClienteFormProps) => {
  return (
    <div className="border  border-gray-700 rounded-lg my-2 p-4">
      <div>
        <label
          htmlFor="nomeCliente"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Nome do Cliente
        </label>
        <input
          id="nomeCliente"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          {...register("cliente.nome")}
        />{" "}
      </div>
      <div className="mt-2">
        <label
          htmlFor="telefoneCliente"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Telefone do Cliente
        </label>
        <input
          id="telefoneCliente"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          {...register("cliente.telefone")}
        />{" "}
      </div>
      <div className="mt-2">
        <label
          htmlFor="rgCliente"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          RG
        </label>
        <input
          id="rgCliente"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          {...register("cliente.rg")}
        />{" "}
      </div>
      <div className="mt-2">
        <label
          htmlFor="cpfCliente"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          CPF
        </label>
        <input
          id="cpfCliente"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          {...register("cliente.cpf")}
        />{" "}
      </div>
      <div className="mt-2">
        <label
          htmlFor="enderecoCliente"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Endereço
        </label>
        <input
          id="enderecoCliente"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          {...register("cliente.endereco")}
        />{" "}
      </div>
      <div className="mt-2">
        <label
          htmlFor="emailCliente"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email do Cliente
        </label>
        <input
          id="emailCliente"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          {...register("cliente.email")}
        />{" "}
      </div>
    </div>
  );
};

export default ClienteForm;
