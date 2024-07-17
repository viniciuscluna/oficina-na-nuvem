import { useQuery } from "@tanstack/react-query";
import Loader from "../../../loader";
import { useMemo } from "react";
import { getCarCustomer } from "../../../../services/veiculoService";

interface ModalCarProps {
    id: string;
}

const ModalCar = ({ id }: ModalCarProps) => {

    const carCustomerResult = useQuery({
        queryKey: ["cliente", id],
        queryFn: () => getCarCustomer(id || ""),
    });


    const isPending = useMemo(
        () => carCustomerResult.isPending,
        [carCustomerResult.isPending]
    );

    if (isPending) <Loader />;

    return (
        <>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Marca
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Modelo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ano
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Placa
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {carCustomerResult.data instanceof Array ? carCustomerResult.data?.map((car, index) => (
                            <tr
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                key={index}
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {car.marca}
                                </th>
                                <td className="px-6 py-4">{car.modelo}</td>
                                <td className="px-6 py-4">{car.ano}</td>
                                <td className="px-6 py-4">{car.placa}</td>
                            </tr>
                        )) : <></>}
                    </tbody>
                </table>
            </div>
        </>)

}

export default ModalCar;