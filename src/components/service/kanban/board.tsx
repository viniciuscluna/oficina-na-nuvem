import { useMemo, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

import {
  changeStatus,
  getAllByPrestador as getByPrestador,
} from "../../../services/prestacaoServicoService";

import Card from "./card";
import Loader from "../../loader";
import { EPrestacaoServicoStatus } from "../../../domain/ePrestacaoServicoStatus";
import { usePageStore } from "../../../stores/pageStore";
import { ChangeStatus } from "../../../types/changeStatusRequest";
import { useIncludeServiceStore } from "../../../stores/includeServiceStore";
import { useServiceStore } from "../../../stores/servicosStore";

const Board = () => {
  const prestadorId = usePageStore((state) => state.prestadorId);
  const isInsertOpened = useIncludeServiceStore((state) => state.isOpened);
  const setServicos = useServiceStore((state) => state.setServicos);

  const {
    mutateAsync,
    data: prestacaoData,
    isLoading,
  } = useMutation({
    mutationKey: ["prestacaoServico"],
    mutationFn: () => getByPrestador(prestadorId),
    onSuccess: (resp) => {
      setServicos(resp);
    },
  });

  const { mutateAsync: mutateStatusAsync } = useMutation({
    mutationKey: ["cardButtons"],
    mutationFn: ({ id, status }: ChangeStatus) => changeStatus(id, status),
    onSuccess: () => mutateAsync(),
  });

  useEffect(() => {
    if (prestadorId !== "") mutateAsync();
  }, [prestadorId, mutateAsync]);

  useEffect(() => {
    if (!isInsertOpened) mutateAsync();
  }, [isInsertOpened, mutateAsync]);

  const abertaAnalise = useMemo(
    () =>
      prestacaoData?.filter((f) =>
        [
          EPrestacaoServicoStatus.aberto,
          EPrestacaoServicoStatus.analise,
          EPrestacaoServicoStatus.aprovado,
        ].includes(f.status)
      ),
    [prestacaoData]
  );

  const andamentoTeste = useMemo(
    () =>
      prestacaoData?.filter((f) =>
        [
          EPrestacaoServicoStatus.andamento,
          EPrestacaoServicoStatus.teste,
        ].includes(f.status)
      ),
    [prestacaoData]
  );

  const concluido = useMemo(
    () =>
      prestacaoData?.filter((f) =>
        [
          EPrestacaoServicoStatus.concluido,
          EPrestacaoServicoStatus.rejeitado,
        ].includes(f.status)
      ),
    [prestacaoData]
  );

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-grow my-2 flex-col md:flex-row gap-6 w-full">
      <div className="border rounded border-gray-700 w-full">
        <h3 className="text-2xl text-center my-5 font-bold dark:text-white">
          Aberta/Análise
        </h3>
        <div className="flex flex-col gap-y-4 px-2 max-h-[40vh] md:max-h-[65vh] xl:max-h-[75vh] overflow-auto">
          {abertaAnalise?.map((prestacao, index) => (
            <Card
              prestacao={prestacao}
              keyProp={index}
              changeStatusCallback={(status) => mutateStatusAsync(status)}
            />
          ))}
        </div>
      </div>
      <div className="border rounded border-gray-700 w-full">
        <h3 className="text-2xl text-center my-5 font-bold dark:text-white">
          Andamento/Teste
        </h3>
        <div className="flex flex-col gap-y-4 px-2 max-h-[40vh] md:max-h-[65vh] xl:max-h-[75vh] overflow-auto">
          {andamentoTeste?.map((prestacao, index) => (
            <Card
              prestacao={prestacao}
              keyProp={index}
              changeStatusCallback={(status) => mutateStatusAsync(status)}
            />
          ))}
        </div>
      </div>
      <div className="border rounded border-gray-700 w-full">
        <h3 className="text-2xl text-center my-5 font-bold dark:text-white">
          Concluídas
        </h3>
        <div className="flex flex-col gap-y-4 px-2 max-h-[40vh] md:max-h-[65vh] xl:max-h-[75vh] overflow-auto">
          {concluido?.map((prestacao, index) => (
            <Card
              prestacao={prestacao}
              keyProp={index}
              changeStatusCallback={(status) => mutateStatusAsync(status)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
