import { useMemo } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../../../components/loader";
import { getIdPrestador, editPrestador } from "../../../services/prestadorService";
import { PathCrudProps } from "../../../types/pathCrudProps";
import { useNotificationStore } from "../../../stores/notificationStore";
import ServiceProviderForm from "../../../components/records/serviceProviderForm";
import { Prestador } from "../../../domain/prestador";

const EditServiceProvider = () => {
    const params = useParams<PathCrudProps>();
    const backPage = "/logged/records/serviceProvider";
    const navigate = useNavigate();
    const addNotification = useNotificationStore(
        (state) => state.addNotification
    );

    const editServiceProviderResult = useMutation({
        mutationFn: editPrestador,
        onSuccess: () => {
            navigate(backPage);
            addNotification({
                message: "Prestador atualizado!",
                type: "success",
            });
        },
        onError: () => {
            addNotification({
                message: "Erro ao atualizar prestador.",
                type: "error"
            })
        }
    });

    const serviceProviderResult = useQuery({
        queryKey: ["serviceProvider", params.id],
        queryFn: () => getIdPrestador(params.id || ""),
    });

    const onSubmit = (prestador: Prestador) => {
        editServiceProviderResult.mutateAsync(prestador);
    };

    const isPending = useMemo(
        () => editServiceProviderResult.isPending || serviceProviderResult.isPending,
        [editServiceProviderResult.isPending, serviceProviderResult.isPending]
    );

    return (
        <div>
            <h3 className="text-2xl font-extrabold dark:text-white my-6">
                Editar Prestador
            </h3>
            {isPending ? (
                <Loader />
            ) : (
                <ServiceProviderForm
                    backCallback={() => navigate(backPage)}
                    submitCallback={onSubmit}
                    defaultValues={serviceProviderResult.data}
                    label="Editar"
                />
            )}
        </div>
    );
};

export default EditServiceProvider;
