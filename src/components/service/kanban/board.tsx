import { useEffect, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  changeStatus,
  getAllByPrestador as getByPrestador,
} from "../../../services/prestacaoServicoService";

import Card from "./card";
import Loader from "../../loader";
import { EPrestacaoServicoStatus } from "../../../domain/ePrestacaoServicoStatus";
import { ChangeStatus } from "../../../types/changeStatusRequest";
import { useIncludeServiceStore } from "../../../stores/includeServiceStore";
import { useServiceStore } from "../../../stores/servicosStore";
import { PrestacaoServico } from "../../../domain/prestacaoServico";

const Board = () => {
  const queryClient = useQueryClient();
  const { isInsertOpened, setPrestacaoEdit } = useIncludeServiceStore(
    (state) => ({
      isInsertOpened: state.isIncludeOpened || state.isUpdateOpened,
      setPrestacaoEdit: state.setPrestacao,
    })
  );
  const setServicos = useServiceStore((state) => state.setServicos);

  const enableFetch = useMemo(() => !isInsertOpened, [isInsertOpened]);

  const {
    data: prestacaoData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["prestacaoServico"],
    queryFn: () => getByPrestador(),
    onSuccess: (resp) => {
      setServicos(resp);
    },
    enabled:  enableFetch,
    refetchInterval: 10000,
  });

  useEffect(() => {
    if(enableFetch){
      queryClient.invalidateQueries({ queryKey: ["prestador"]});
      queryClient.invalidateQueries({ queryKey: ["cliente"]});
      queryClient.invalidateQueries({ queryKey: ["veiculo"]});
    }
  }, [enableFetch, queryClient]);

  const { mutateAsync: mutateStatusAsync, isLoading: isStatusLoading } =
    useMutation({
      mutationKey: ["cardButtons"],
      mutationFn: ({ id, status }: ChangeStatus) => changeStatus(id, status),
      onSuccess: () => refetch()
    });

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

  const andamento = useMemo(
    () =>
      prestacaoData?.filter((f) =>
        [EPrestacaoServicoStatus.andamento].includes(f.status)
      ),
    [prestacaoData]
  );

  const teste = useMemo(
    () =>
      prestacaoData?.filter((f) =>
        [EPrestacaoServicoStatus.teste].includes(f.status)
      ),
    [prestacaoData]
  );

  const onEdit = (prestacao: PrestacaoServico) => {
    setPrestacaoEdit(prestacao);
  };

  if (isLoading || isStatusLoading) return <Loader />;

  return (
    <div className="flex flex-col grow md:flex-row gap-3 w-full">
      <div className="border rounded border-gray-200 dark:border-gray-700 w-full">
        <h3 className="text-2xl text-center my-5 font-bold dark:text-white">
          Aberta/Análise
        </h3>
        <div className="flex flex-col gap-y-4 px-2  max-h-[40vh] md:max-h-[65vh] xl:max-h-[75vh] overflow-auto">
          {abertaAnalise?.map((prestacao, index) => (
            <Card
              prestacao={prestacao}
              key={index}
              changeStatusCallback={mutateStatusAsync}
              editCallback={onEdit}
            />
          ))}
        </div>
      </div>
      <div className="border rounded  border-gray-200 dark:border-gray-700 w-full">
        <h3 className="text-2xl text-center my-5 font-bold dark:text-white">
          Andamento
        </h3>
        <div className="flex flex-col gap-y-4 px-2 max-h-[40vh] md:max-h-[65vh] xl:max-h-[75vh] overflow-auto">
          {andamento?.map((prestacao, index) => (
            <Card
              prestacao={prestacao}
              key={index}
              changeStatusCallback={mutateStatusAsync}
              editCallback={onEdit}
            />
          ))}
        </div>
      </div>
      <div className="border rounded border-gray-200 dark:border-gray-700 w-full">
        <h3 className="text-2xl text-center my-5 font-bold dark:text-white">
          Teste
        </h3>
        <div className="flex flex-col gap-y-4 px-2 max-h-[40vh] md:max-h-[65vh] xl:max-h-[75vh] overflow-auto">
          {teste?.map((prestacao, index) => (
            <Card
              prestacao={prestacao}
              key={index}
              changeStatusCallback={mutateStatusAsync}
              editCallback={onEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
