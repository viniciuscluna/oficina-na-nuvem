import { useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { usePageStore } from "../../stores/pageStore";
import { useServiceStore } from "../../stores/servicosStore";
import { EPrestacaoServicoStatus } from "../../domain/ePrestacaoServicoStatus";
import { getAllByPrestador as getByPrestador } from "../../services/prestacaoServicoService";
import Card from "../../components/service/kanban/card";
import Loader from "../../components/loader";
import SubTitle from "../../components/subTitle";
import Filter from "../../components/reports/filter";

const Reports = () => {
  const prestadorId = usePageStore((state) => state.prestadorId);
  const [refFilter, setRefFilter] = useState<string>("");
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
      prestacaoData?.filter(
        (f) =>
          [
            EPrestacaoServicoStatus.concluido,
            EPrestacaoServicoStatus.rejeitado,
          ].includes(f.status) && f.referencia.includes(refFilter)
      ),
    [prestacaoData, refFilter]
  );

  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-extrabold dark:text-white mt-6 mb-4">
        Serviços Finalizados
      </h2>
      <SubTitle>
        <Filter inputCallback={setRefFilter} />
      </SubTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {concluidas?.map((prestacao, index) => (
          <Card key={index} prestacao={prestacao} />
        ))}
      </div>
    </div>
  );
};

export default Reports;
