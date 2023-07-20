import { useEffect } from "react";

import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { PrestacaoServico } from "../../../domain/prestacaoServico";
import { useMutation } from "@tanstack/react-query";
import { Marca } from "../../../domain/fipe/marca";
import { getModelosByMarca } from "../../../services/fipeService";

type VeiculoFormProps = {
  register: UseFormRegister<PrestacaoServico>;
  watch: UseFormWatch<PrestacaoServico>;
  marcas: Marca[];
};

const VeiculoForm = ({ register, marcas, watch }: VeiculoFormProps) => {
  const marcaSelecionada = marcas.find(
    (f) => f.nome == watch("veiculo.marca")
  )?.codigo;

  const { mutateAsync, data: modelos } = useMutation({
    mutationKey: ["veiculoModelos"],
    mutationFn: () => getModelosByMarca(marcaSelecionada || ""),
  });

  useEffect(() => {
    if (
      marcaSelecionada !== "" &&
      marcaSelecionada !== undefined &&
      marcaSelecionada !== null
    )
      mutateAsync();
  }, [marcaSelecionada, mutateAsync]);

  return (
    <div className="border  border-gray-700 rounded-lg my-2 p-4">
      <div>
        <label
          htmlFor="marcaVeiculo"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Marca
        </label>
        <select
          id="marcaVeiculo"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          {...register("veiculo.marca")}
        >
          {marcas.map((marca, index) => (
            <option key={index} value={marca.nome}>
              {marca.nome}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="modeloVeiculo"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Modelo
        </label>
        <select
          id="modeloVeiculo"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          {...register("veiculo.modelo")}
        >
          {modelos?.modelos.map((modelo, index) => (
            <option key={index} value={modelo.nome}>
              {modelo.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-2">
        <label
          htmlFor="placaVeiculo"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Placa
        </label>
        <input
          id="placaVeiculo"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          {...register("veiculo.placa")}
        />{" "}
      </div>
      <div className="mt-2">
        <label
          htmlFor="tipoVeiculo"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Tipo
        </label>
        <select
          id="tipoVeiculo"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          {...register("veiculo.tipo")}
        >
          <option value={0}>Carro</option>
          <option value={1}>Moto</option>
          <option value={2}>Caminhão</option>
          <option value={3}>Ônibus</option>
          <option value={4}>Outros</option>
        </select>
      </div>
    </div>
  );
};

export default VeiculoForm;
