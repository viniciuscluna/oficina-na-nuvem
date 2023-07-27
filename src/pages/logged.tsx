import { Outlet } from "react-router-dom";
import { getAll as getPrestador } from "../services/prestadorService";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
import { usePageStore } from "../stores/pageStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Logged = () => {
  const changePrestadorId = usePageStore((state) => state.changePrestadorId);

  const prestadorResult = useQuery({
    queryKey: ["prestador"],
    queryFn: getPrestador,
  });

  useEffect(() => {
    if (!prestadorResult.isLoading)
      changePrestadorId(
        (prestadorResult.data && prestadorResult.data[0]?.id) || ""
      );
  }, [prestadorResult.isLoading, prestadorResult.data, changePrestadorId]);

  return (
    <main className="dark:bg-gray-900 h-full flex">
      <Sidebar />
      <section className="px-4 w-full flex flex-col overflow-auto">
        <div className="flex flex-col grow">
          <Outlet />
        </div>
        <Footer />
      </section>
    </main>
  );
};
export default Logged;
