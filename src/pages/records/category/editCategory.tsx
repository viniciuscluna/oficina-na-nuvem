import { useMemo } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../../../components/loader";
import { getId, edit } from "../../../services/categoriaService";
import { CategoriaServico } from "../../../domain/categoriaServico";
import CategoryForm from "../../../components/records/categoryForm";
import { PathCrudProps } from "../../../types/pathCrudProps";
import { useNotificationStore } from "../../../stores/notificationStore";

const EditCategory = () => {
  const params = useParams<PathCrudProps>();
  const backPage = "/logged/records/category";
  const navigate = useNavigate();
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const editCategoriaResult = useMutation({
    mutationFn: edit,
    onSuccess: () => {
      navigate(backPage);
      addNotification({
        message: "Categoria atualizada!",
        type: "success",
      });
    },
    onError: () => {
      addNotification({
        message: "Erro ao atualizar categoria.",
        type: "error"
      })
    }
  });

  const categoriaResult = useQuery({
    queryKey: ["categoria", params.id],
    queryFn: () => getId(params.id || ""),
  });

  const onSubmit = (categoria: CategoriaServico) => {
    editCategoriaResult.mutateAsync(categoria);
  };

  const isPending = useMemo(
    () => editCategoriaResult.isPending || categoriaResult.isPending,
    [editCategoriaResult.isPending, categoriaResult.isPending]
  );

  return (
    <div>
      <h3 className="text-2xl font-extrabold dark:text-white my-6">
        Editar Categoria
      </h3>
      {isPending ? (
        <Loader />
      ) : (
        <CategoryForm
          backCallback={() => navigate(backPage)}
          submitCallback={onSubmit}
          defaultValues={categoriaResult.data}
          label="Editar"
        />
      )}
    </div>
  );
};

export default EditCategory;
