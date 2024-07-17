import { useQuery } from "@tanstack/react-query";
import {
  Rectangle,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { getDiaryProfit } from "../../services/dashboardService";
import { useMemo } from "react";
import LoadingIndicator from "../loadingIndicator";
import { currencyFormat } from "../../utils/currencyFormater";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-green-300 p-3 shadow rounded-md dark:text-white" >
        <p className="label">Data: {`${label}`}</p>
        <p className="label">Valor: {` ${currencyFormat(payload[0].value)}`}</p>
        <p className="desc">Valores faturados no dia.</p>
      </div>
    );
  }

  return null;
};

const ProfitChartLine = () => {

  const { isPending, data: responseData } = useQuery({
    queryKey: ["dash/diaryProfit"],
    queryFn: getDiaryProfit,
  });

  const data = useMemo(
    () =>
      responseData ?
        responseData.map((item) => ({
          name: item.key,
          faturamento: Number(item.count),
        })) : [],
    [responseData]

  );

  if (isPending) return <LoadingIndicator />;

  return (
    <div className="p-2 w-full">
      <h5 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Faturamento Diário
      </h5>
      <br />
      <div
        className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        style={{ width: "100%", height: "40dvh" }}
      >
        <ResponsiveContainer>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(number: number) => currencyFormat(number)} content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="faturamento"
              fill="#ffffff"
              activeDot={<Rectangle fill="gold" stroke="purple" />}
            />
          </LineChart>
        </ResponsiveContainer>      
      </div>
    </div>
  );
};

export default ProfitChartLine;
