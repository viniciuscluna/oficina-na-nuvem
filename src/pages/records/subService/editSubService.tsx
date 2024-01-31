import { useMemo } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { getAll } from "../../../services/categoriaService";
import Loader from "../../../components/loader";
import { SubServico } from "../../../domain/subServico";
import { edit, getId } from "../../../services/subServicoService";
import SubServiceForm from "../../../components/records/subServiceForm";
import { PathCrudProps } from "../../../types/pathCrudProps";
import { useNotificationStore } from "../../../stores/notificationStore";

const EditSubService = () => {
  const params = useParams<PathCrudProps>();

  const backPage = "/logged/records/subService";
  const navigate = useNavigate();
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );
  


  const categoriaResult = useQuery({
    queryKey: ["categoria"],
    queryFn: () => getAll('', ''),
  });

  const subServicoResult = useQuery({
    queryKey: ["subServico", params.id],
    queryFn: () => getId(params.id || ""),
  });

  const editSubServicoResult = useMutation({
    mutationFn: edit,
    onSuccess: () => {
      navigate(backPage);
      addNotification({
        message: "Subserviço atualizado!",
        type: "success",
      });
    },
    onError: () => {
      addNotification({
        message: "Erro ao atualizar Subserviço.",
        type: "error"
      })
    }
  });

  const onSubmit = (subServico: SubServico) => {
    editSubServicoResult.mutateAsync(subServico);
  };

  const isPending = useMemo(
    () =>
      categoriaResult.isPending ||
      subServicoResult.isPending ||
      editSubServicoResult. isPending,
    [
      categoriaResult.isPending,
      subServicoResult.isPending,
      editSubServicoResult.isPending,
    ]
  );
  return (
    <div>
      <h3 className="text-2xl font-extrabold dark:text-white my-6">
        Editar SubServiço
      </h3>
      {isPending ? (
        <Loader />
      ) : (
        <SubServiceForm
          backCallback={() => navigate(backPage)}
          categorias={categoriaResult.data instanceof Array ? categoriaResult.data : []}
          submitCallback={onSubmit}
          defaultValues={subServicoResult.data}
          label="Editar"
        />
      )}
    </div>
  );
};

export default EditSubService;
