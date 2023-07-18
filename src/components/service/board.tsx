import Card from "./card";

const Board = () => (
  <div className="flex flex-grow my-2 flex-col md:flex-row gap-6 w-full">
    <div className="border rounded border-gray-700 w-full">
      <h3 className="text-2xl text-center my-5 font-bold dark:text-white">
        Aberta/Análise
      </h3>
      <div className="flex flex-col gap-y-4 px-2 max-h-[40vh] md:max-h-[65vh] xl:max-h-[75vh] overflow-auto">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
    <div className="border rounded border-gray-700 w-full">
      <h3 className="text-2xl text-center my-5 font-bold dark:text-white">
        Andamento/Teste
      </h3>
      <div className="flex flex-col gap-y-4 px-2 max-h-[40vh] md:max-h-[65vh] xl:max-h-[75vh] overflow-auto">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
    <div className="border rounded border-gray-700 w-full">
      <h3 className="text-2xl text-center my-5 font-bold dark:text-white">
        Concluídas
      </h3>
      <div className="flex flex-col gap-y-4 px-2 max-h-[40vh] md:max-h-[65vh] xl:max-h-[75vh] overflow-auto">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  </div>
);

export default Board;
