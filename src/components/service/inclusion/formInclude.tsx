import { useFieldArray, useForm } from "react-hook-form";
import { Cliente } from "../../../domain/cliente";
import { Prestador } from "../../../domain/prestador";
import { SubServico } from "../../../domain/subServico";
import { Veiculo } from "../../../domain/veiculo";
import { PrestacaoServico } from "../../../domain/prestacaoServico";
import ClienteForm from "./clienteForm";
import VeiculoForm from "./veiculoForm";
import { Marca } from "../../../domain/fipe/marca";
import { useEffect, useMemo } from "react";
import { useIncludeServiceStore } from "../../../stores/includeServiceStore";

type FormIncludeProps = {
  prestadores: Prestador[];
  veiculos: Veiculo[];
  subServicos: SubServico[];
  clientes: Cliente[];
  marcas: Marca[];
  submitCallback: (servico: PrestacaoServico) => void;
  isOpened: boolean;
};

const FormInclude = ({
  prestadores,
  veiculos,
  subServicos,
  clientes,
  marcas,
  isOpened,
  submitCallback,
}: FormIncludeProps) => {
  const { prestacaoServico, changeIsOpened } =
    useIncludeServiceStore((state) => ({
      prestacaoServico: state.prestacaoServico,
      changeIsOpened: state.changeIsIncludeOpened,
    }));

  const { register, handleSubmit, control, reset, setValue, watch } =
    useForm<PrestacaoServico>();

  const {
    fields: servicos,
    append: appendServico,
    remove: removeServico,
  } = useFieldArray<PrestacaoServico>({
    control,
    name: "servicos",
  });

  useEffect(() => {
    if (!isOpened) {
      reset();
    }
  }, [reset, setValue, register, prestacaoServico, isOpened]);

  const showClienteForm = watch("clienteId") === "other";
  const showVeiculoForm = watch("veiculoId") === "other";

  const addServico = () => {
    appendServico({ nome: "", valor: 0, subServicoId: "" });
  };

  const submit = (form: PrestacaoServico) => {
    reset();
    submitCallback(form);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="space-y-4">
        <div className="overflow-auto max-h-[80dvh]">
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
              {prestadores.map((prestador, index) => (
                <option key={index} value={prestador.id}>
                  {prestador.nome}
                </option>
              ))}
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
              {clientes.map((cliente, index) => (
                <option key={index} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
              <option value="other">Incluir</option>
            </select>
            {showClienteForm ? <ClienteForm register={register} /> : <></>}
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
              {veiculos.map((veiculo, index) => (
                <option key={index} value={veiculo.id}>
                  {veiculo.marca} - {veiculo.modelo}
                </option>
              ))}
              <option value="other">Incluir</option>
            </select>
            {showVeiculoForm ? (
              <VeiculoForm marcas={marcas} register={register} watch={watch} />
            ) : (
              <></>
            )}
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
                      {subServicos?.map((subServico, index) => (
                        <option key={index} value={subServico.id}>
                          {subServico.titulo} - {subServico.desc} -{" "}
                          {subServico.categoria.titulo}
                        </option>
                      ))}
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
  );
};

export default FormInclude;
