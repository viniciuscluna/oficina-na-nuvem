import { useMemo } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getAll } from "../../../services/categoriaService";
import Loader from "../../../components/loader";
import { SubServico } from "../../../domain/subServico";
import { add } from "../../../services/subServicoService";
import SubServiceForm from "../../../components/records/subServiceForm";
import { useNotificationStore } from "../../../stores/notificationStore";

const AddSubService = () => {
  const backPage = "/logged/records/subService";
  const navigate = useNavigate();
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );
  
  const categoriaResult = useQuery({
    queryKey: ["subService"],
    queryFn: () => getAll('', ''),
  });

  const subServicoResult = useMutation({
    mutationFn: add,
    onSuccess: () => {
      navigate(backPage);
      addNotification({
        message: "Subserviço inserido!",
        type: "success",
      });
    },
    onError: () => {
      addNotification({
        message: "Erro ao inserir Subserviço.",
        type: "error"
      })
    }
  });

  const onSubmit = (subServico: SubServico) => {
    subServicoResult.mutateAsync(subServico);
  };

  const isPending = useMemo(
    () =>
      categoriaResult.isPending ||
      subServicoResult.isPending ,
    [
      categoriaResult.isPending,
      subServicoResult.isPending,
    ]
  );

  return (
    <div>
      <h3 className="text-2xl font-extrabold dark:text-white my-6">
        Incluir SubServiço
      </h3>
      {isPending ? (
        <Loader />
      ) : (
        <SubServiceForm
          backCallback={() => navigate(backPage)}
          categorias={categoriaResult.data instanceof Array ? categoriaResult.data : []}
          submitCallback={onSubmit}
          label="Adicionar"
        />
      )}
    </div>
  );
};

export default AddSubService;
