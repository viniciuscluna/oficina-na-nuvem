import Board from "../components/service/kanban/board";
import Include from "../components/service/inclusion/include";
import { useIncludeServiceStore } from "../stores/includeServiceStore";
import Update from "../components/service/inclusion/update";

const Service = () => {
  const changeIsOpened = useIncludeServiceStore(
    (state) => state.changeIsIncludeOpened
  );

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-extrabold dark:text-white my-6">
          Prestação de Serviços
        </h2>
        <button
          type="button"
          onClick={() => changeIsOpened()}
          className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Adicionar Serviço
        </button>
      </div>
      <Board />
      <Include />
      <Update />
    </>
  );
};

export default Service;
