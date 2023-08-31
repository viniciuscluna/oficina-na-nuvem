import { UseFormRegister } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";

import { PrestacaoServico } from "../../../domain/prestacaoServico";

type ClienteFormProps = {
  register: UseFormRegister<PrestacaoServico>;
};

const ClienteForm = ({ register }: ClienteFormProps) => {
  const registerWithMask = useHookFormMask(register);

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
          maxLength={125}
          {...register("cliente.nome", { required: true })}
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
          {...registerWithMask("cliente.telefone", ["(99) [9]9999-9999"], {
            required: true,
          })}
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
          {...registerWithMask("cliente.rg", ["99999999-9"])}
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
          {...registerWithMask("cliente.cpf", "cpf", {
            required: true,
          })}
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
          maxLength={250}
          {...register("cliente.endereco", {
            required: true,
          })}
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
          maxLength={250}
          {...registerWithMask("cliente.email", "email", {
            required: true,
          })}
        />{" "}
      </div>
    </div>
  );
};

export default ClienteForm;
