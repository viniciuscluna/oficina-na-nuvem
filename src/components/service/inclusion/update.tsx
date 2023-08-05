import classNames from "classnames";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";

import { useIncludeServiceStore } from "../../../stores/includeServiceStore";
import { PrestacaoServico } from "../../../domain/prestacaoServico";
import { Cliente } from "../../../domain/cliente";
import { Marca } from "../../../domain/fipe/marca";
import { Veiculo } from "../../../domain/veiculo";
import { Prestador } from "../../../domain/prestador";
import { SubServico } from "../../../domain/subServico";

import { edit as editPrestacaoServico } from "../../../services/prestacaoServicoService";

import FormUpdate from "./formUpdate";
import Loader from "../../loader";


const Update = () => {
  const queryClient = useQueryClient();
  const { changeIsOpened, isOpened, prestacaoServico } = useIncludeServiceStore(
    (state) => ({
      changeIsOpened: state.changeIsUpdateOpened,
      isOpened: state.isUpdateOpened,
      prestacaoServico: state.prestacaoServico,
    })
  );

  const clientes = queryClient.getQueryData<Cliente[]>(["cliente"]) || [];
  const marcas = queryClient.getQueryData<Marca[]>(["veiculoMarcas"]) || [];
  const veiculos = queryClient.getQueryData<Veiculo[]>(["veiculo"]) || [];
  const prestadores = queryClient.getQueryData<Prestador[]>(["prestador"]) || [];
  const subServicos = queryClient.getQueryData<SubServico[]>(["subServico"]) || [];

  const editPrestacaoServicoMut = useMutation({
    mutationKey: ["prestacaoServico"],
    mutationFn: editPrestacaoServico,
    onSuccess: () => {
      changeIsOpened();
    },
  });

  const onEdit: SubmitHandler<PrestacaoServico> = (data) =>
    editPrestacaoServicoMut.mutateAsync(data);

  return (
    <>
      <div
        id="drawer-create-product-default"
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
          Editar Serviço - {prestacaoServico?.referencia}
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

        {editPrestacaoServicoMut.isLoading ? (
          <Loader />
        ) : (
          <FormUpdate
            clientes={clientes}
            prestadores={prestadores}
            veiculos={veiculos}
            subServicos={subServicos}
            marcas={marcas}
            submitCallback={onEdit}
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

export default Update;
