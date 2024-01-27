type GenericCardPros = {
  label: string;
  amount: number;
};

const GenericCard = ({ label, amount }: GenericCardPros) => {
  return (
    <div className="block w-full text-center p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {label}
      </h5>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {new Intl.NumberFormat("pt-BR", {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(amount)}
      </h2>
    </div>
  );
};

export default GenericCard;
