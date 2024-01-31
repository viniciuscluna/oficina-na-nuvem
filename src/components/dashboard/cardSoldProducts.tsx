import { useQuery } from "@tanstack/react-query";
import GenericCard from "./genericCard";
import { getProduct } from "../../services/dashboardService";
import LoadingIndicator from "../loadingIndicator";

const CardSoldProducts = () => {
  const { isPending, data } = useQuery({
    queryKey: ["dash/products"],
    queryFn: getProduct,
  });
  if (isPending) return <LoadingIndicator />;

  return <GenericCard label="Produtos vendidos nesse mês" amount={data?.valor ?? 0}  useCurrency={false} />;
};

export default CardSoldProducts;