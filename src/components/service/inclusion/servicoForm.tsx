import {
  FieldArrayWithId,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { PrestacaoServico } from "../../../domain/prestacaoServico";
import { SubServico } from "../../../domain/subServico";

type ServicoFormProps = {
  servicos: FieldArrayWithId<PrestacaoServico, "servicos" | "produtos", "id">[];
  subServicos: SubServico[];
  register: UseFormRegister<PrestacaoServico>;
  removeServicoCallback: (index: number) => void;
  setValue: UseFormSetValue<PrestacaoServico>;
};

const ServicoForm = ({
  servicos,
  subServicos,
  register,
  removeServicoCallback,
  setValue,
}: ServicoFormProps) => {
  const updateValor = (index: number, value: string) => {
    const valor = subServicos.find((f) => f.id === value)?.valorServico;
    if (valor && valor !== 0) setValue(`servicos.${index}.valor`, valor);
  };
  return (
    <>
      {servicos.map((__, index) => (
        <div
          key={index}
          className="flex w-full justify-between flex-wrap border border-gray-200 rounded-lg shadow dark:border-gray-600 rounded-lg p-4 gap-4"
        >
          <div className="w-[65%]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Categoria do Serviço
            </label>
            <select
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register(`servicos.${index}.subServicoId`)}
              onChange={(e) => updateValor(index, e.target.value)}
            >
              {subServicos?.map((subServico, index) => (
                <option key={index} value={subServico.id}>
                  {subServico.titulo} - {subServico.desc} -{" "}
                  {subServico.categoria.titulo}
                </option>
              ))}
            </select>
          </div>
          <div className="w-[30%]">
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
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Descrição Serviço
            </label>
            <textarea
              id="small-input"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register(`servicos.${index}.descricao`)}
            ></textarea>
          </div>
          <button
            type="button"
            onClick={() => removeServicoCallback(index)}
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Remover
          </button>
        </div>
      ))}
    </>
  );
};

export default ServicoForm;
