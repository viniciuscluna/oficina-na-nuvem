import classNames from "classnames";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";

import { useIncludeServiceStore } from "../../../stores/includeServiceStore";
import { useNotificationStore } from "../../../stores/notificationStore";
import { PrestacaoServico } from "../../../domain/prestacaoServico";
import { Cliente } from "../../../domain/cliente";
import { Veiculo } from "../../../domain/veiculo";
import { SubServico } from "../../../domain/subServico";
import { FuncionarioPrestador } from "../../../domain/funcionarioPrestador";

import { add as addPrestacaoServico } from "../../../services/prestacaoServicoService";

import FormInclude from "./formInclude";
import Loader from "../../loader";

const Include = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore(state => state.addNotification);
  const { changeIsOpened, isOpened, setUpdateQuery } = useIncludeServiceStore((state) => ({
    changeIsOpened: state.changeIsIncludeOpened,
    setUpdateQuery: state.setUpdateQuery,
    isOpened: state.isIncludeOpened,
  }));

  const clientes = queryClient.getQueryData<Cliente[]>(["cliente"]) || [];
  const veiculos = queryClient.getQueryData<Veiculo[]>(["veiculo"]) || [];
  const subServicos = queryClient.getQueryData<SubServico[]>(["subServico"]) || [];
  const funcionarios = queryClient.getQueryData<FuncionarioPrestador[]>(["funcionario"]) || [];

  const addPrestacaoServicoMut = useMutation({
    mutationFn: addPrestacaoServico,
    onSuccess: (data) => {
      changeIsOpened();
      setUpdateQuery(true);
      addNotification({
        message: `${data.referencia} inserida!`,
        type: 'success'
      });
    },
    onError: () => {
      changeIsOpened();
      addNotification({
        message: 'Erro ao inserir',
        type: 'error'
      });
    }
  });

  const onSubmit: SubmitHandler<PrestacaoServico> = (data) =>
    addPrestacaoServicoMut.mutateAsync(data);

  return (
    <>
      <div
        id="drawer-update-product-default"
        className={classNames(
          "fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-full max-w-4xl dark:bg-gray-800",
          isOpened ? "transform-none" : "translate-x-full"
        )}
        tabIndex={-1}
        aria-labelledby="drawer-label"
        aria-hidden="true"
      >
        <h5
          id="drawer-label"
          className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Novo Serviço
        </h5>
        <button
          type="button"
          data-drawer-dismiss="drawer-create-product-default"
          aria-controls="drawer-create-product-default"
          onClick={() => changeIsOpened()}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>

        {addPrestacaoServicoMut.isPending ? (
          <Loader />
        ) : (
          <FormInclude
            clientes={clientes}
            veiculos={veiculos}
            subServicos={subServicos}
            funcionarios={funcionarios}
            submitCallback={onSubmit}
            isOpened={isOpened}
          />
        )}
      </div>
      {isOpened ? (
        <div
          drawer-backdrop=""
          className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30"
          onClick={() => changeIsOpened()}
        ></div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Include;
