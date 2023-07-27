import { useMemo } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { getAll } from "../../../services/categoriaService";
import Loader from "../../../components/loader";
import { SubServico } from "../../../domain/subServico";
import { edit, getId } from "../../../services/subServicoService";
import SubServiceForm from "../../../components/records/subServiceForm";
import { PathCrudProps } from "../../../types/pathCrudProps";

const EditSubService = () => {
  const params = useParams<PathCrudProps>();

  const backPage = "/logged/records/subService";
  const navigate = useNavigate();

  const categoriaResult = useQuery({
    queryKey: ["categoria"],
    queryFn: getAll,
  });

  const subServicoResult = useQuery({
    queryKey: ["subServico", params.id],
    queryFn: () => getId(params.id || ""),
  });

  const editSubServicoResult = useMutation({
    mutationKey: ["editSubServico"],
    mutationFn: edit,
    onSuccess: () => {
      navigate(backPage);
    },
  });

  const onSubmit = (subServico: SubServico) => {
    editSubServicoResult.mutateAsync(subServico);
  };

  const isLoading = useMemo(
    () =>
      categoriaResult.isLoading ||
      subServicoResult.isLoading ||
      editSubServicoResult.isLoading,
    [
      categoriaResult.isLoading,
      subServicoResult.isLoading,
      editSubServicoResult.isLoading,
    ]
  );
  return (
    <div>
      <h3 className="text-2xl font-extrabold dark:text-white my-6">
        Editar SubServiço
      </h3>
      {isLoading ? (
        <Loader />
      ) : (
        <SubServiceForm
          backCallback={() => navigate(backPage)}
          categorias={categoriaResult.data || []}
          submitCallback={onSubmit}
          defaultValues={subServicoResult.data}
          label="Editar"
        />
      )}
    </div>
  );
};

export default EditSubService;
