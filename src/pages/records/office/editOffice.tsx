import { useMemo } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../../../components/loader";
import { getId, edit } from "../../../services/filialService";
import { FilialServico} from "../../../domain/filialServico";
import OfficeForm from "../../../components/records/officeForm";
import { PathCrudProps } from "../../../types/pathCrudProps";
import { useNotificationStore } from "../../../stores/notificationStore";

const EditOffice = () => {
  const params = useParams<PathCrudProps>();
  const backPage = "/logged/records/office";
  const navigate = useNavigate();
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const editFilialResult = useMutation({
    mutationFn: edit,
    onSuccess: () => {
      navigate(backPage);
      addNotification({
        message: "Filial atualizada!",
        type: "success",
      });
    },
    onError: () => {
      addNotification({
        message: "Erro ao atualizar Filial.",
        type: "error"
      })
    }
  });

  const filialResult = useQuery({
    queryKey: ["filial", params.id],
    queryFn: () => getId(params.id || ""),
  });

  const onSubmit = (filial: FilialServico) => {
    editFilialResult.mutateAsync(filial);
  };

  const isPending = useMemo(
    () => editFilialResult.isPending || filialResult.isPending,
    [editFilialResult.isPending, filialResult.isPending]
  );
  return (
    <div>
      <h3 className="text-2xl font-extrabold dark:text-white my-6">
        Editar Filial
      </h3>
      {isPending ? (
        <Loader />
      ) : (
        <OfficeForm
          backCallback={() => navigate(backPage)}
          submitCallback={onSubmit}
          defaultValues={filialResult.data}
          label="Editar"
        />
      )}
    </div>
  );
};

export default EditOffice;
