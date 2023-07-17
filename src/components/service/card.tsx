import List from "./list";

const Card = () => (
  <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="flex justify-between w-full mb-2">
      <a href="#">
        <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
          OSXXXX
        </h5>
      </a>
      <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
        Default
      </span>
    </div>
    <div className="flex flex-wrap gap-5">
      <p className="mb-3 text-gray-700 dark:text-gray-400 ">
        <span className="font-bold">R$:</span> XXX.XXX,XX
      </p>
      <p className="mb-3 text-gray-700 dark:text-gray-400 font-bold">
        <span className="font-bold"> Cliente:</span> Test
      </p>
      <p className="mb-3 text-gray-700 dark:text-gray-400 font-bold">
        <span className="font-bold">Veículo:</span> Test
      </p>
      <p className="mb-3 text-gray-700 dark:text-gray-400 font-bold">
        <span className="font-bold">Placa:</span> Test
      </p>
    </div>
    <div className="block">
      <List />
    </div>
    <div className="flex flex-wrap mt-4 gap-1">
      <button
        type="button"
        className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Extra small
      </button>
      <button
        type="button"
        className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Extra small
      </button>
      <button
        type="button"
        className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Extra small
      </button>
      <button
        type="button"
        className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Extra small
      </button>
      <button
        type="button"
        className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Extra small
      </button>
    </div>
  </div>
);

export default Card;
