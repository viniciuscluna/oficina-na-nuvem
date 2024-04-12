import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Loader from "../../../components/loader";
import { addPrestador } from "../../../services/prestadorService";
import { useNotificationStore } from "../../../stores/notificationStore";
import { AxiosError } from "axios";
import ServiceProviderForm from "../../../components/records/serviceProviderForm";
import { Prestador } from "../../../domain/prestador";

const AddServiceProvider = () => {
    const backPage = "/logged/records/serviceProvider";
    const navigate = useNavigate();
    const addNotification = useNotificationStore(
        (state) => state.addNotification
    );

    const prestadorResult = useMutation({
        mutationFn: addPrestador,
        onSuccess: () => {
            navigate(backPage);
            addNotification({
                message: "Prestador inserido!",
                type: "success",
            });
        },
        onError: (error: AxiosError) => {

            if (error.response?.status === 400) {
                // eslint-disable-next-line
                const errordata = error.response?.data as any[]
                addNotification({
                    message: errordata?.map(errors => errors.errorMensagem).join(","),
                    type: "error",
                    duration: 5000
                })
                return
            }

            addNotification({
                message: "Erro ao inserir prestador.",
                type: "error"
            })
        }
    });

    const onSubmit = (prestador: Prestador) => {
        prestadorResult.mutateAsync(prestador);
    };

    return (
        <div>
            <h3 className="text-2xl font-extrabold dark:text-white my-6">
                Incluir Prestador
            </h3>
            {prestadorResult.isPending ? (
                <Loader />
            ) : (
                <ServiceProviderForm
                    backCallback={() => navigate(backPage)}
                    submitCallback={onSubmit}
                    label="Adicionar"
                />
            )}
        </div>
    );
};

export default AddServiceProvider;
