import { useMemo } from "react";

import classNames from "classnames";
import { useQuery, useMutation } from "@tanstack/react-query";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import { useIncludeServiceStore } from "../../stores/includeServiceStore";
import { PrestacaoServico } from "../../domain/prestacaoServico";
import { getAll as getAllSubServico } from "../../services/subServicoService";
import { getAll as getAllCliente } from "../../services/clienteService";
import { getAll as getPrestador } from "../../services/prestadorService";
import { getAll as getVeiculo } from "../../services/veiculoService";
import { add as addPrestacaoServico } from "../../services/prestacaoServicoService";

const Include = () => {
  const { changeIsOpened, isOpened } = useIncludeServiceStore((state) => ({
    changeIsOpened: state.changeIsOpened,
    isOpened: state.isOpened,
  }));
  const subServicoResult = useQuery({
    queryKey: ["subServico"],
    queryFn: getAllSubServico,
  });

  const clienteResult = useQuery({
    queryKey: ["cliente"],
    queryFn: getAllCliente,
  });

  const prestadorResult = useQuery({
    queryKey: ["prestador"],
    queryFn: getPrestador,
  });

  const veiculoResult = useQuery({
    queryKey: ["veiculo"],
    queryFn: getVeiculo,
  });

  const prestacaoServico = useMutation({
    mutationKey: ["prestacaoServico"],
    mutationFn: addPrestacaoServico,
    onSuccess: () => {
      changeIsOpened();
      reset();
    },
  });

  const isLoading = useMemo(
    () =>
      prestadorResult.isLoading ||
      clienteResult.isLoading ||
      subServicoResult.isLoading ||
      veiculoResult.isLoading ||
      prestacaoServico.isLoading,
    [
      prestadorResult.isLoading,
      clienteResult.isLoading,
      subServicoResult.isLoading,
      veiculoResult.isLoading,
      prestacaoServico.isLoading,
    ]
  );

  const { register, handleSubmit, control, reset } =
    useForm<PrestacaoServico>();

  const {
    fields: servicos,
    append: appendServico,
    remove: removeServico,
  } = useFieldArray<PrestacaoServico>({
    control,
    name: "servicos",
  });

  const onSubmit: SubmitHandler<PrestacaoServico> = (data) =>
    prestacaoServico.mutateAsync(data);

  const addServico = () => {
    appendServico({ nome: "", valor: 0, subServicoId: "" });
  };
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="prestadorId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Prestador
              </label>
              <select
                id="prestadorId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                {...register("prestadorId")}
              >
                {prestadorResult.data?.map((prestador, index) => (
                  <option key={index} value={prestador.id}>
                    {prestador.nome}
                  </option>
                ))}
                <option value="other">Incluir</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="clienteId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Cliente
              </label>
              <select
                id="clienteId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                {...register("clienteId")}
              >
                {clienteResult.data?.map((cliente, index) => (
                  <option key={index} value={cliente.id}>
                    {cliente.nome}
                  </option>
                ))}
                <option value="other">Incluir</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="veiculoId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Veículo
              </label>
              <select
                id="veiculoId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                {...register("veiculoId")}
              >
                {veiculoResult.data?.map((veiculo, index) => (
                  <option key={index} value={veiculo.id}>
                    {veiculo.marca} - {veiculo.modelo}
                  </option>
                ))}
                <option value="other">Incluir</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="servicos"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Serviços
              </label>
              <div className="flex gap-2 flex-col">
                {servicos.map((servico, index) => (
                  <div
                    key={index}
                    className="flex w-full justify-between flex-wrap border border-gray-600 rounded-lg p-4"
                  >
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Categoria do Serviço
                      </label>
                      <select
                        className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        {...register(`servicos.${index}.subServicoId`)}
                      >
                        {subServicoResult.data?.map((subServico, index) => (
                          <option key={index} value={subServico.id}>
                            {subServico.titulo} - {subServico.desc} -{" "}
                            {subServico.categoria.titulo}
                          </option>
                        ))}
                        <option value="other">Incluir</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Valor
                      </label>
                      <input
                        type="number"
                        id="small-input"
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        {...register(`servicos.${index}.valor`)}
                      ></input>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Descrição Serviço
                      </label>
                      <textarea
                        id="small-input"
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        {...register(`servicos.${index}.nome`)}
                      ></textarea>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeServico(index)}
                      className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addServico()}
                className="px-3 py-2 my-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Adicionar Serviço
              </button>
            </div>
            <div className="bottom-0 left-0 flex justify-center w-full pb-4 space-x-4 md:px-4 md:absolute">
              <button
                type="submit"
                className="text-white w-full justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Criar Ordem
              </button>
              <button
                type="button"
                data-drawer-dismiss="drawer-create-product-default"
                aria-controls="drawer-create-product-default"
                onClick={() => changeIsOpened()}
                className="inline-flex w-full justify-center text-gray-500 items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 -ml-1 sm:mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                Cancelar
              </button>
            </div>
          </div>
        </form>
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
          <></>
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
