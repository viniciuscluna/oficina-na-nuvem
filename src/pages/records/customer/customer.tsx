import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import { getAll, desabled } from "../../../services/clienteService";
import Loader from "../../../components/loader";
import Filter from "../../../components/filter";
import { useEffect, useState } from "react";
import { useHookFormMask } from "use-mask-input";
import { useNotificationStore } from "../../../stores/notificationStore";
import ConfirmModal from "../../../components/confirmModal";
import { cpfFormater } from "../../../utils/cpfFormater";
import { dateTimeFormarter } from "../../../utils/dateTimeFormarter";
import ModalGeneric from "../../../components/service/modal/modal";
import ModalCar from "../../../components/service/modal/modalCar/modalCar";

type CustomerFields = {
  nome: string;
  cpf: string;
  email: string;
};

const Customer = () => {
  const [isDisableSelect, setDisableSelect] = useState<string | undefined>(undefined);
  const [isIdCustomerCar, setIdCustomerCar] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );
  const { mutateAsync, isPending, data } = useMutation({
    mutationFn: (fields: CustomerFields) =>
      getAll(fields.nome, fields.cpf, fields.email),
  });
  const { register, handleSubmit, getValues } = useForm<CustomerFields>();
  const registerWithMask = useHookFormMask(register);
  const formatCpf = cpfFormater;
  const formatDate = dateTimeFormarter;

  const { mutateAsync: mutateDisableAsync } = useMutation({
    mutationFn: (id: string) =>
      desabled(id),
    onSuccess: () => {
      setDisableSelect(undefined);
      const formValues = getValues();
      mutateAsync(formValues);
      addNotification({
        message: "Cliente apagado(a) com sucesso!",
        type: "success",
      });
    }
  });

  useEffect(() => {
    mutateAsync({ nome: "", cpf: "", email: "" });
  }, [mutateAsync]);

  const onSubmit = (fields: CustomerFields) => {
    mutateAsync(fields);
  };

  if (isPending) <Loader />;

  return (
    <>
      <ConfirmModal
        isOpened={isDisableSelect !== undefined}
        onNoCallback={() => setDisableSelect(undefined)}
        onYesCallback={() => mutateDisableAsync(isDisableSelect || "")}
        message="Deseja realmente excluir o(a) cliente?"
      />
      <ModalGeneric
        isOpened={isIdCustomerCar !== undefined}
        title="Carros do cliente"
        footer={
          <>
          </>
        }
        onClose={() => setIdCustomerCar(undefined)}
      >
        <ModalCar
          id={isIdCustomerCar || ""}
        />
      </ModalGeneric>
      <div className="flex flex-col mt-8">
        <div className="flex flex-col  gap-5">
          <Filter defaultValue={false}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4">
                {/* Aqui você pode adicionar os campos de filtro */}
                <div className="mb-6">
                  <label
                    htmlFor="nome"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="nome"
                    {...register("nome")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Entre com o nome aqui"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="cpf"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    CPF
                  </label>
                  <input
                    type="text"
                    id="cpf"
                    {...registerWithMask("cpf", "cpf")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Entre com o Cpf aqui"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    {...registerWithMask("email", "email")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Entre com o e-mail aqui"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-800 text-white px-4 py-2 rounded-md ml-auto block ml-auto"
                >
                  Filtrar
                </button>
              </div>
            </form>
          </Filter>

          <div>
            <button
              type="button"
              onClick={() => navigate("add")}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Incluir
            </button>
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nome
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Cpf
                  </th>
                  <th scope="col" className="px-6 py-3">
                    E-mail
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Endereço
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Dat. Cadastro
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {data instanceof Array ? data?.map((cliente, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={index}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {cliente.nome}
                    </th>
                    <td className="px-6 py-4">{formatCpf(cliente.cpf)}</td>
                    <td className="px-6 py-4">{cliente.email}</td>
                    <td className="px-6 py-4">{cliente.endereco}</td>
                    <td className="px-6 py-4">{cliente.dataCadastro ? formatDate(cliente.dataCadastro) : 'Data não disponível'}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        <NavLink title="Editar" to={`edit/${cliente.id}`}>
                          <svg
                            className="w-4 h-4 text-green-800 dark:text-green-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 18"
                          >
                            <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                            <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                          </svg>
                        </NavLink>
                        <button type="button" title="Carros" onClick={() => setIdCustomerCar(cliente.id)}>
                          <svg className="w-4 h-4 text-red-800 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
                            <path d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                          </svg>
                        </button>
                        <button type="button" title="Excluir" onClick={() => setDisableSelect(cliente.id)}>
                          <svg className="w-4 h-4 text-red-800 dark:text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : <></>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
