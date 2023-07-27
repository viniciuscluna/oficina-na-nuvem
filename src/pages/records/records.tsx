import { useMemo } from "react";

import { Outlet, useLocation } from "react-router-dom";

const Records = () => {
  const location = useLocation();

  const page = useMemo(() => {
    const base = "/logged/records/";
    if (location.pathname.startsWith(`${base}category`)) return "Categoria";
    if (location.pathname.startsWith(`${base}subService`)) return "Sub-Serviço";
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
