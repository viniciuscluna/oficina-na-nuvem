import { useQuery } from "@tanstack/react-query";
import { getClient } from "../../services/dashboardService";
import LoadingIndicator from "../loadingIndicator";
import GenericCard from "./genericCard";

const CardClients = () => {
  const { isPending, data } = useQuery({
    queryKey: ["dash/client"],
    queryFn: getClient,
  });
  if (isPending) return <LoadingIndicator />;

  return <GenericCard label="Novos clientes" amount={data?.valor ?? 0} useCurrency={false} />;
};

export default CardClients;