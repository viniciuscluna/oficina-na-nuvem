import { useEffect, useRef } from "react";

import { useReactToPrint } from "react-to-print";
import { useQuery } from "@tanstack/react-query";
import { getId } from "../../../services/prestacaoServicoService";
import ComponentPrint from "./componentPrint";
import Loader from "../../loader";

type PrintContainerProps = {
  prestacaoId: string;
}
const PrintContainer = ({prestacaoId} : PrintContainerProps) => {
  
  const componentRef = useRef<HTMLElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const { isPending, data } = useQuery({
    queryKey: ["prestacaoById", prestacaoId],
    queryFn: () => getId(prestacaoId || ""),
  });

  useEffect(() => {
    if (!isPending) document.title = `OS: ${data?.referencia}`;
  }, [isPending, data?.referencia]);

  if (isPending && data) return <Loader />;
  else
    return (
      <section className="flex flex-col gap-5 w-full items-center">
        <div className="my-5 text-center">
          <button
            onClick={() => handlePrint()}
            className="text-gray-900 bg-green-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Imprimir!
          </button>
        </div>
        <section className="block w-[60%] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 overflow-x-auto">
          {data ? (
            <ComponentPrint ref={componentRef} prestacao={data} />
          ) : (
            <></>
          )}
        </section>
      </section>
    );
};
export default PrintContainer;
