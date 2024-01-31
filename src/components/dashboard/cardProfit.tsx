import { useQuery } from "@tanstack/react-query";
import GenericCard from "./genericCard";
import { getProfit } from "../../services/dashboardService";
import LoadingIndicator from "../loadingIndicator";

const CardProfit = () => {
  const { isPending, data } = useQuery({
    queryKey: ["dash/profit"],
    queryFn: getProfit,
  });
  if (isPending) return <LoadingIndicator />;
  return <GenericCard label="Receita no mês" amount={data?.valor ?? 0} />;
};

export default CardProfit;
