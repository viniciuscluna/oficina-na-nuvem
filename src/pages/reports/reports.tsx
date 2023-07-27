import { useQuery } from "@tanstack/react-query";
import { useIncludeServiceStore } from "../../stores/includeServiceStore";
import { usePageStore } from "../../stores/pageStore";
import { useServiceStore } from "../../stores/servicosStore";
import { useMemo } from "react";
import { EPrestacaoServicoStatus } from "../../domain/ePrestacaoServicoStatus";
import { getAllByPrestador as getByPrestador } from "../../services/prestacaoServicoService";
import Card from "../../components/service/kanban/card";
import Loader from "../../components/loader";

const Reports = () => {
  const prestadorId = usePageStore((state) => state.prestadorId);

  const setServicos = useServiceStore((state) => state.setServicos);

  const { data: prestacaoData, isLoading } = useQuery({
    queryKey: ["prestacaoServico"],
    queryFn: () => getByPrestador(prestadorId),
    onSuccess: (resp) => {
      setServicos(resp);
    },
    enabled: prestadorId !== "",
    refetchInterval: 10000,
  });

  const concluidas = useMemo(
    () =>
      prestacaoData?.filter((f) =>
        [
          EPrestacaoServicoStatus.concluido,
          EPrestacaoServicoStatus.rejeitado,
        ].includes(f.status)
      ),
    [prestacaoData]
  );

  if(isLoading) return <Loader />;
  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-extrabold dark:text-white mt-6 mb-4">
        Serviços Finalizados
      </h2>
      <div className="flex flex-row flex-wrap gap-5 justify-between">
        {concluidas?.map((prestacao, index) => (
            <div className="w-[30%]">
          <Card prestacao={prestacao} keyProp={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
