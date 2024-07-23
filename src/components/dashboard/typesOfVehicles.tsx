import {
    Rectangle,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar
} from "recharts";

const TypesOfVehicles = () => {

    return(
        <div className="p-2 w-full">
        <h5 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Tipos de veículos
        </h5>
        <br />
        <div
          className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          style={{ width: "100%", height: "40dvh" }}
        >
          <ResponsiveContainer>
          <BarChart
                width={500}
                height={300}
                
                margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
                }}
                >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="mes" fill="#00d583" activeBar={<Rectangle fill="#00d583" stroke="#22cc88" />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
}

export default TypesOfVehicles;