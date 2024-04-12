import { useMutation } from "@tanstack/react-query";
import { getAllPrestador, desabledPrestador } from "../../../services/prestadorService";
import Loader from "../../../components/loader";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNotificationStore } from "../../../stores/notificationStore";
import ConfirmModal from "../../../components/confirmModal";
import { phoneFormater } from "../../../utils/phoneFormater";
import { cpfFormater } from "../../../utils/cpfFormater";
import { dateTimeFormarter } from "../../../utils/dateTimeFormarter";
import { cnpjFormater } from "../../../utils/cnpjFormater";


const ServiceProvider = () => {
    const [isDisableSelect, setDisableSelect] = useState<string | undefined>(undefined);

    const navigate = useNavigate();

    const addNotification = useNotificationStore(
        (state) => state.addNotification
    );

    const { data, isPending, mutateAsync } = useMutation({
        mutationFn: () =>
            getAllPrestador(),
    });

    const formatTel = phoneFormater;
    const formatCpf = cpfFormater;
    const formatDate = dateTimeFormarter;
    const formatCpnj = cnpjFormater;
    const { mutateAsync: mutateDisableAsync } = useMutation({
        mutationFn: (id: string) =>
            desabledPrestador(id),
        onSuccess: () => {
            setDisableSelect(undefined);
            mutateAsync();
            addNotification({
                message: "Prestador(a) apagado(a) com sucesso!",
                type: "success",
            });
        }
    });

    useEffect(() => {
        mutateAsync();
    }, [mutateAsync]);

    if (isPending) <Loader />;

    return (
        <>
            <ConfirmModal
                isOpened={isDisableSelect !== undefined}
                onNoCallback={() => setDisableSelect(undefined)}
                onYesCallback={() => mutateDisableAsync(isDisableSelect || "")}
                message="Deseja realmente excluir o(a) prestador(a)?"
            />
            <div className="flex flex-col mt-8">
                <div className="flex flex-col  gap-5">
                    <div>
                        <button
                            type="button"
                            onClick={() => navigate("add")}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Incluir
                        </button>
                    </div>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Tipo Cadastro
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Nome
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        CPF/CNPJ
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Telefone
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        E-mail
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Endereço
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Razão Social
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Nome Fantasia
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Nome Representante
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Cpf Representante
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        E-mail Representante
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Sit. Cadastral
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Dat. Abertura
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Dat. Cadastro
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data instanceof Array ? data?.map((prestador, index) => (
                                    <tr
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        key={index}
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {prestador.situacaoCadastral == 0 ? "Cpf" : "Cnpj"}
                                        </th>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {prestador.nome}
                                        </th>
                                        <td className="px-6 py-4">{prestador.cnpj == '' ? formatCpf(prestador.cpf) : formatCpnj(prestador.cnpj)}</td>
                                        <td className="px-6 py-4">{formatTel(prestador.telefone)}</td>
                                        <td className="px-6 py-4">{prestador.emailEmpresa}</td>
                                        <td className="px-6 py-4">{prestador.endereco}</td>
                                        <td className="px-6 py-4">{prestador.razaoSocial}</td>
                                        <td className="px-6 py-4">{prestador.nomeFantasia}</td>
                                        <td className="px-6 py-4">{prestador.nomeRepresentante}</td>
                                        <td className="px-6 py-4">{cpfFormater(prestador.cpfRepresentante ?? "")}</td>
                                        <td className="px-6 py-4">{prestador.emailRepresentante}</td>
                                        <td className="px-6 py-4">{prestador.situacaoCadastral == 0 ? "Desativado" : "Ativo"}</td>
                                        <td className="px-6 py-4">{formatDate(prestador.dataCadastro == null ? "" : prestador.dataCadastro)}</td>
                                        <td className="px-6 py-4">{formatDate(prestador.dataAbertura == null ? "" : prestador.dataAbertura)}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-1">
                                                <NavLink title="Editar" to={`edit/${prestador.id}`}>
                                                    <svg
                                                        className="w-4 h-4 text-green-800 dark:text-green-400"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 18"
                                                    >
                                                        <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                                                        <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                                                    </svg>
                                                </NavLink>
                                                <button type="button" title="Excluir" onClick={() => setDisableSelect(prestador.id)}>
                                                    <svg className="w-4 h-4 text-red-800 dark:text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                                        <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : <></>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiceProvider;
