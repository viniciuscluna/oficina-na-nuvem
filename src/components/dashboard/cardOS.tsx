import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../loadingIndicator";
import GenericCard from "./genericCard";
import { getOS } from "../../services/dashboardService";

const CardOS = () => {
    const { isPending, data } = useQuery({
        queryKey: ["dash/os"],
        queryFn: getOS,
      });
      if (isPending) return <LoadingIndicator />;

  return <GenericCard label="OS nesse mês" amount={data?.valor ?? 0} useCurrency={false} />;
};

export default CardOS;