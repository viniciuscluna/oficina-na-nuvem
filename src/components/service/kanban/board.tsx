import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  changeStatus,
  getAllInProgress,
} from "../../../services/prestacaoServicoService";

import Card from "./card";
import Loader from "../../loader";
import { EPrestacaoServicoStatus } from "../../../domain/ePrestacaoServicoStatus";
import { ChangeStatus } from "../../../types/changeStatusRequest";
import { useIncludeServiceStore } from "../../../stores/includeServiceStore";
import { useServiceStore } from "../../../stores/servicosStore";
import { PrestacaoServico } from "../../../domain/prestacaoServico";
import ConfirmModal from "../../confirmModal";
import { useNotificationStore } from "../../../stores/notificationStore";

const Board = () => {
  const [pendingConfirm, setPendingConfirm] = useState<ChangeStatus | null>(
    null
  );

  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );
  const queryClient = useQueryClient();
  const { setPrestacaoEdit, updateQuery, setUpdateQuery } =
    useIncludeServiceStore((state) => ({
      updateQuery: state.updateQuery,
      setPrestacaoEdit: state.setPrestacaoId,
      setUpdateQuery: state.setUpdateQuery,
    }));
  const setServicos = useServiceStore((state) => state.setServicos);

  const {
    data: prestacaoData,
    isPending,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["getAllInProgressPrestador"],
    queryFn: () => getAllInProgress(),
  });

  useEffect(() => {
    if (isSuccess) setServicos(prestacaoData);
  }, [isSuccess, setServicos, prestacaoData])

  useEffect(() => {
    if (updateQuery) {
      queryClient.invalidateQueries({ queryKey: ["prestador"] });
      queryClient.invalidateQueries({ queryKey: ["cliente"] });
      queryClient.invalidateQueries({ queryKey: ["veiculo"] });
      refetch();
      setUpdateQuery(false);
    }
  }, [updateQuery, queryClient, refetch, setUpdateQuery]);

  const { mutateAsync: mutateStatusAsync, isPending: isStatusLoading } =
    useMutation({
      mutationFn: ({ id, status }: ChangeStatus) => changeStatus(id, status),
      onSuccess: () => {
        refetch();
        addNotification({ message: "Status atualizado!", type: "success" });
      },
      onError: () => {
        addNotification({ message: "Erro ao alterar status :(", type: "error" });
      }
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
    setPrestacaoEdit(prestacao.id || "");
  };

  const handleConfirmStatus = (status: ChangeStatus) => {
    if (status.status === EPrestacaoServicoStatus.rejeitado) {
      setPendingConfirm(status);
    } else mutateStatusAsync(status);
  };

  const confirmRemoval = () => {
    if (pendingConfirm !== null) {
      mutateStatusAsync(pendingConfirm);
      setPendingConfirm(null);
    }
  };

  const cancelRemoval = () => {
    setPendingConfirm(null);
  };

  if (isPending || isStatusLoading) return <Loader />;

  return (
    <>
      <ConfirmModal
        message="Deseja realmente realizar essa operação?"
        onNoCallback={cancelRemoval}
        onYesCallback={confirmRemoval}
        isOpened={pendingConfirm !== null}
      />
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
                changeStatusCallback={handleConfirmStatus}
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
                changeStatusCallback={handleConfirmStatus}
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
                changeStatusCallback={handleConfirmStatus}
                editCallback={onEdit}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
