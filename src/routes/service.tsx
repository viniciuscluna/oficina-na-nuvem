import { useState } from "react";
import Board from "../components/service/board";
import Include from "../components/service/include";

const Service = () => {
  const [isOpened, setIsOpened] = useState<boolean>(true);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-extrabold dark:text-white my-6">
          Prestação de Serviços
        </h2>
        <button
          type="button"
          onClick={() => setIsOpened((isOpn) => !isOpn)}
          className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Adicionar Serviço
        </button>
      </div>
      <Board />
      <Include isOpened={isOpened} />
    </div>
  );
};

export default Service;
