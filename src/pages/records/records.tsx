import { useMemo } from "react";

import { Outlet, useLocation } from "react-router-dom";

const Records = () => {
  const location = useLocation();

  const page = useMemo(() => {
    const base = "/logged/records/";
    if (location.pathname.startsWith(`${base}category`)) return "Categoria";
    if (location.pathname.startsWith(`${base}subService`)) return "Sub-Serviço";
    if (location.pathname.startsWith(`${base}product`)) return "Produto";
    if (location.pathname.startsWith(`${base}employee`)) return "Funcionário";
    if (location.pathname.startsWith(`${base}customer`)) return "Cliente";
    if (location.pathname.startsWith(`${base}office`)) return "Filial";
    if (location.pathname.startsWith(`${base}serviceProvider`)) return "Prestador";
    else return "Cadastro";
  }, [location.pathname]);

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-extrabold dark:text-white mt-6 mb-4">
        {page}
      </h2>
      <Outlet />
    </div>
  );
};

export default Records;
