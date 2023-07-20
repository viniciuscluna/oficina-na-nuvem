import { useMemo, useEffect } from "react";

import classNames from "classnames";
import { useQuery, useMutation } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";

import { useIncludeServiceStore } from "../../../stores/includeServiceStore";
import { PrestacaoServico } from "../../../domain/prestacaoServico";
import { getAll as getAllSubServico } from "../../../services/subServicoService";
import { getAll as getAllCliente } from "../../../services/clienteService";
import { getAll as getPrestador } from "../../../services/prestadorService";
import { getAll as getVeiculo } from "../../../services/veiculoService";
import { add as addPrestacaoServico } from "../../../services/prestacaoServicoService";
import { getMarcas } from "../../../services/fipeService";
import { usePageStore } from "../../../stores/pageStore";

import Form from "./form";

const Include = () => {
  const { changeIsOpened, isOpened } = useIncludeServiceStore((state) => ({
    changeIsOpened: state.changeIsOpened,
    isOpened: state.isOpened,
  }));

  const changePrestadorId = usePageStore((state) => state.changePrestadorId);

  const subServicoResult = useQuery({
    queryKey: ["subServico"],
    queryFn: getAllSubServico,
    refetchOnWindowFocus: false,
  });

  const clienteResult = useQuery({
    queryKey: ["cliente"],
    queryFn: getAllCliente,
    refetchOnWindowFocus: false,
  });

  const prestadorResult = useQuery({
    queryKey: ["prestador"],
    queryFn: getPrestador,
    refetchOnWindowFocus: false,
  });

  const veiculoResult = useQuery({
    queryKey: ["veiculo"],
    queryFn: getVeiculo,
    refetchOnWindowFocus: false,
  });

  const marcaResult = useQuery({
    queryKey: ["veiculoMarcas"],
    queryFn: getMarcas,
    refetchOnWindowFocus: false,
  });

  const prestacaoServico = useMutation({
    mutationKey: ["prestacaoServico"],
    mutationFn: addPrestacaoServico,
    onSuccess: () => {
      changeIsOpened();
    },
  });

  const isLoading = useMemo(
    () =>
      prestadorResult.isLoading ||
      clienteResult.isLoading ||
      subServicoResult.isLoading ||
      veiculoResult.isLoading ||
      prestacaoServico.isLoading ||
      marcaResult.isLoading,
    [
      prestadorResult.isLoading,
      clienteResult.isLoading,
      subServicoResult.isLoading,
      veiculoResult.isLoading,
      prestacaoServico.isLoading,
      marcaResult.isLoading,
    ]
  );

  useEffect(() => {
    if (!isLoading)
      changePrestadorId(
        (prestadorResult.data && prestadorResult.data[0]?.id) || ""
      );
  }, [isLoading, prestadorResult.data, changePrestadorId]);

  const onSubmit: SubmitHandler<PrestacaoServico> = (data) =>
    prestacaoServico.mutateAsync(data);

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

        {isLoading ? (
          <div
            role="status"
            className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <Form
            changeIsOpened={changeIsOpened}
            clientes={clienteResult.data || []}
            prestadores={prestadorResult.data || []}
            veiculos={veiculoResult.data || []}
            subServicos={subServicoResult.data || []}
            marcas={marcaResult.data || []}
            submitCallback={onSubmit}
          />
        )}
      </div>
      {isOpened ? (
        <div
          drawer-backdrop=""
          className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30"
        ></div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Include;
