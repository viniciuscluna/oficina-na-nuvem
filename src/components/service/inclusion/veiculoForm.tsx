import { useEffect, useMemo } from "react";

import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { useHookFormMask } from "use-mask-input";

import { PrestacaoServico } from "../../../domain/prestacaoServico";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  getDetalheByAnosModelosAndMarca,
  getMarcas,
} from "../../../services/fipeService";
import {
  getAnosByModelosAndMarca,
  getModelosByMarca,
} from "../../../services/fipeService";
import SelectFilter from "../../selectFilter";
import { EveiculoTipo } from "../../../domain/eVeiculoTipo";

type VeiculoFormProps = {
  register: UseFormRegister<PrestacaoServico>;
  control: Control<PrestacaoServico>;
  watch: UseFormWatch<PrestacaoServico>;
  setValue: UseFormSetValue<PrestacaoServico>;
};

const VeiculoForm = ({
  register,
  control,
  watch,
  setValue,
}: VeiculoFormProps) => {
  const tipoVeiculo = watch("veiculo.tipo");
  const { data: marcas } = useQuery({
    queryKey: ["veiculoMarcas", tipoVeiculo],
    queryFn: () => getMarcas(tipoVeiculo),
  });

  const registerWithMask = useHookFormMask(register);
  const marca = watch("veiculo.marca");
  const marcaSelecionada = useMemo(
    () => marcas && marcas.find((f) => f.nome == marca)?.codigo,
    [marca, marcas]
  );

  const { mutateAsync, data: modelos } = useMutation({
    mutationFn: () => getModelosByMarca(tipoVeiculo, marcaSelecionada || ""),
  });

  const modelo = watch("veiculo.modelo");
  const modeloSelecionado = useMemo(
    () => modelos?.modelos.find((f) => f.nome == modelo)?.codigo,
    [modelo, modelos]
  );

  const anoSelecionado = watch("veiculo.anoSelect");

  const otherTipoSelected = useMemo(
    () => tipoVeiculo === EveiculoTipo.outros,
    [tipoVeiculo]
  );

  const { mutateAsync: mutateAnoAsync, data: anos } = useMutation({
    mutationFn: () =>
      getAnosByModelosAndMarca(
        tipoVeiculo,
        marcaSelecionada || "",
        modeloSelecionado || ""
      ),
  });

  const { mutateAsync: mutateDetailAsync, data: detail } = useMutation({
    mutationFn: () =>
      getDetalheByAnosModelosAndMarca(
        tipoVeiculo,
        marcaSelecionada || "",
        modeloSelecionado || "",
        anoSelecionado || ""
      ),
  });

  useEffect(() => {
    if (detail) {
      setValue("veiculo.ano", detail.AnoModelo);
      setValue("veiculo.tipoCombustivel", detail.Combustivel);
    }
  }, [detail, setValue]);

  useEffect(() => {
    if (
      marcaSelecionada !== "" &&
      marcaSelecionada !== undefined &&
      marcaSelecionada !== null
    )
      mutateAsync();
  }, [marcaSelecionada, mutateAsync]);

  useEffect(() => {
    if (
      modeloSelecionado !== "" &&
      modeloSelecionado !== undefined &&
      modeloSelecionado !== null
    )
      mutateAnoAsync();
  }, [modeloSelecionado, mutateAnoAsync]);

  useEffect(() => {
    if (anoSelecionado !== "" && anoSelecionado !== undefined && anoSelecionado !== null)
      mutateDetailAsync();
  }, [anoSelecionado, mutateDetailAsync]);

  return (
    <div className="border  border-gray-700 rounded-lg my-2 p-4">
      <div>
        <label
          htmlFor="tipoVeiculo"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Tipo
        </label>
        <select
          id="tipoVeiculo"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          {...register("veiculo.tipo", { valueAsNumber: true })}
        >
          <option value={0}>Carro</option>
          <option value={1}>Moto</option>
          <option value={2}>Caminhão</option>
          <option value={3}>Ônibus</option>
          <option value={4}>Outros</option>
        </select>
      </div>
      {otherTipoSelected ? (
        <>
          <div className="mt-2">
            <label
              htmlFor="marcaVeiculo"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Marca
            </label>
            <input
              id="marcaVeiculo"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              maxLength={80}
              {...register("veiculo.marca", { required: true })}
            />
          </div>
          <div className="mt-1">
            <label
              htmlFor="modeloVeiculo"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Modelo
            </label>
            <input
              id="modeloVeiculo"
              type="text"
              maxLength={150}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              {...register("veiculo.modelo", { required: true })}
            />
          </div>
        </>
      ) : (
        <>
          <div className="mt-2">
            <label
              htmlFor="marcaVeiculo"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Selecione a Marca
            </label>
            <SelectFilter
              name="veiculo.marca"
              search="test"
              control={control}
              searchPlaceholder="Procurar"
              values={
                (marcas &&
                  marcas.map((marca) => ({
                    name: marca.nome,
                    value: marca.nome,
                  }))) ||
                []
              }
              emptyPlaceholder="Escolha a marca"
            />
          </div>
          <div className="mt-1">
            <label
              htmlFor="modeloVeiculo"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Selecione o Modelo
            </label>
            <SelectFilter
              name="veiculo.modelo"
              search="test"
              control={control}
              searchPlaceholder="Procurar"
              values={
                modelos?.modelos.map((modelo) => ({
                  name: modelo.nome,
                  value: modelo.nome,
                })) || []
              }
              emptyPlaceholder="Escolha o modelo"
            />
          </div>
          <div className="mt-1">
            <label
              htmlFor="anoVeiculo"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Selecione o Ano
            </label>
            <SelectFilter
              name="veiculo.anoSelect"
              search="Procure por ano"
              control={control}
              searchPlaceholder="Procurar"
              values={
                anos?.map((ano) => ({
                  name: ano.nome,
                  value: ano.codigo,
                })) || []
              }
              emptyPlaceholder="Escolha o ano"
            />
          </div>
        </>
      )}

      <div className="mt-2">
        <label
          htmlFor="anoVeiculo"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Ano
        </label>
        <input
          id="anoVeiculo"
          disabled={!otherTipoSelected}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          min={0}
          {...register("veiculo.ano", { required : true })}
        />{" "}
      </div>
      <div className="mt-2">
        <label
          htmlFor="tipoCombustivelVeiculo"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Tipo Combustível
        </label>
        <input
          id="tipoCombustivelVeiculo"
          disabled={!otherTipoSelected}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          maxLength={25}
          {...register("veiculo.tipoCombustivel")}
        />{" "}
      </div>
      <div className="mt-2">
        <label
          htmlFor="chassiVeiculo"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Chassi
        </label>
        <input
          id="chassiVeiculo"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          {...registerWithMask("veiculo.chassi", ["9AAAAAAAAA9999999"])}
        />{" "}
      </div>
      <div className="mt-2">
        <label
          htmlFor="kmVeiculo"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Km
        </label>
        <input
          id="kmVeiculo"
          type="number"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          min={0}
          {...register("veiculo.km", { required: true })}
        />{" "}
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
          {...registerWithMask("veiculo.placa", ["AAA-9[A|9]99"], { required: true })}
        />{" "}
      </div>
    </div>
  );
};

export default VeiculoForm;
