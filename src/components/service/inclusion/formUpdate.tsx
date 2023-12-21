import { useFieldArray, useForm } from "react-hook-form";

import { Cliente } from "../../../domain/cliente";
import { SubServico } from "../../../domain/subServico";
import { Veiculo } from "../../../domain/veiculo";
import { PrestacaoServico } from "../../../domain/prestacaoServico";
import ClienteForm from "./clienteForm";
import VeiculoForm from "./veiculoForm";
import { useIncludeServiceStore } from "../../../stores/includeServiceStore";
import ServicoForm from "./servicoForm";
import SelectFilter from "../../selectFilter";
import ProdutoForm from "./produtoForm";
import { Produto } from "../../../domain/produto";
import { FuncionarioPrestador } from "../../../domain/funcionarioPrestador";

type FormUpdateProps = {
  veiculos: Veiculo[];
  subServicos: SubServico[];
  clientes: Cliente[];
  funcionarios: FuncionarioPrestador[];
  prestacaoServico: PrestacaoServico;
  submitCallback: (servico: PrestacaoServico) => void;
  isOpened: boolean;
};

const FormUpdate = ({
  veiculos,
  subServicos,
  clientes,
  funcionarios,
  prestacaoServico,
  submitCallback,
}: FormUpdateProps) => {
  const { changeIsOpened } = useIncludeServiceStore((state) => ({
    changeIsOpened: state.changeIsUpdateOpened,
  }));

  const { register, handleSubmit, control, reset, watch, setValue } =
    useForm<PrestacaoServico>({
      defaultValues: prestacaoServico,
    });

  const {
    fields: servicos,
    append: appendServico,
    remove: removeServico,
  } = useFieldArray<PrestacaoServico>({
    control,
    name: "servicos",
  });

  const {
    fields: produtos,
    append: appendProduto,
    remove: removeProduto,
  } = useFieldArray<PrestacaoServico>({
    control,
    name: "groupedProducts",
  });

  const showClienteForm = watch("clienteId") === "other";
  const showVeiculoForm = watch("veiculoId") === "other";

  const addServico = () => {
    appendServico({ descricao: "", valor: 0, subServicoId: "" });
  };

  const addProduto = () => {
    appendProduto({
      nome: "",
      marca: "",
      valor_Compra: 0,
      valor_Venda: 0,
      qtd: 1,
    } as Produto);
  };

  const submit = (form: PrestacaoServico) => {
    reset();
    submitCallback(form);
  };

  const handleRemoveProduct = (index: number) => {
    removeProduto(index);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="space-y-4">
        <div className="overflow-auto max-h-[80dvh]">
          <div>
            <label
              htmlFor="funcionarioPrestadorId"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Funcionário
            </label>
            <SelectFilter
              name="funcionarioPrestadorId"
              search="Procure por Funcionário"
              control={control}
              searchPlaceholder="Procurar"
              values={funcionarios.map((funcionario) => ({
                name: funcionario.nome,
                value: funcionario.id?.toString() || "",
              }))}
              emptyPlaceholder="Escolha o funcionário"
              rules={{ required: 'Selecione um funcinário' }}
            />
          </div>
          <div>
            <label
              htmlFor="clienteId"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Cliente
            </label>
            <SelectFilter
              name="clienteId"
              search="Procure por Cliente"
              control={control}
              searchPlaceholder="Procurar"
              values={[
                ...clientes.map((cliente) => ({
                  name: cliente.nome,
                  value: cliente.id?.toString() || "",
                })),
                ...[{ name: "Inserir", value: "other" }],
              ]}
              emptyPlaceholder="Escolha o cliente"
              rules={{ required: 'Selecione um cliente' }}
            />
            {showClienteForm ? <ClienteForm register={register} /> : <></>}
          </div>
          <div>
            <label
              htmlFor="veiculoId"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Veículo
            </label>
            <SelectFilter
              name="veiculoId"
              search="Procure por Cliente"
              control={control}
              searchPlaceholder="Procurar"
              values={[
                ...veiculos.map((veiculo) => ({
                  name: `${veiculo.marca} - ${veiculo.modelo}`,
                  value: veiculo.id?.toString() || "",
                })),
                ...[{ name: "Inserir", value: "other" }],
              ]}
              emptyPlaceholder="Escolha o veículo"
              rules={{ required: 'Selecione um veículo' }}
            />
            {showVeiculoForm ? (
              <VeiculoForm
                register={register}
                watch={watch}
                control={control}
                setValue={setValue}
              />
            ) : (
              <></>
            )}
          </div>
          <div>
            <label
              htmlFor="servicos"
              className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Serviços
            </label>
            <div className="flex gap-2 flex-col">
              <ServicoForm
                removeServicoCallback={removeServico}
                register={register}
                servicos={servicos}
                subServicos={subServicos}
                setValue={setValue}
              />
            </div>
            <button
              type="button"
              onClick={() => addServico()}
              className="px-3 py-2 my-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Adicionar Serviço
            </button>
          </div>

          <div>
            <label
              htmlFor="produtos"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Produtos
            </label>
            <div className="flex gap-2 flex-col">
              <ProdutoForm
                arrayName="groupedProducts"
                removeServicoCallback={handleRemoveProduct}
                register={register}
                produtos={produtos}
              />
            </div>
            <button
              type="button"
              onClick={() => addProduto()}
              className="px-3 py-2 my-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Adicionar Produto
            </button>
          </div>
        </div>
        <div className="bottom-0 left-0 flex justify-center w-full pb-4 space-x-4 md:px-4 md:absolute">
          <button
            type="submit"
            className="text-white w-full justify-center bg-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-primary-800"
          >
            Atualizar Ordem
          </button>
          <button
            type="button"
            data-drawer-dismiss="drawer-create-product-default"
            aria-controls="drawer-create-product-default"
            onClick={() => changeIsOpened()}
            className="inline-flex w-full justify-center text-white-500 items-center bg-red-500 hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-red-900 dark:text-gray-300 dark:border-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-gray-600"
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

export default FormUpdate;
