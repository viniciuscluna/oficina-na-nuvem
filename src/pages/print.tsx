import { useParams } from "react-router-dom";
import PrintContainer from "../components/service/print/printContainer";

const Print = () => {
  const { id } = useParams();

  if (id) return <PrintContainer prestacaoId={id} />;
  else return <>No id provided</>;
};

export default Print;
