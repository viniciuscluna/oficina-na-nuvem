import { currencyFormat } from "../../utils/currencyFormater";

type GenericCardPros = {
  label: string;
  amount: number;
  useCurrency?: boolean;
};

const GenericCard = ({
  label,
  amount,
  useCurrency = true,
}: GenericCardPros) => {
  return (
    <div className="block w-full text-center p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {label}
      </h5>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {useCurrency
          ? currencyFormat(amount)
          : amount}
      </h2>
    </div>
  );
};

export default GenericCard;
