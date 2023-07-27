import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../../../components/loader";
import { getId, edit } from "../../../services/categoriaService";
import { CategoriaServico } from "../../../domain/categoriaServico";
import CategoryForm from "../../../components/records/categoryForm";
import { PathCrudProps } from "../../../types/pathCrudProps";
import { useMemo } from "react";

const EditCategory = () => {
  const params = useParams<PathCrudProps>();
  const backPage = "/logged/records/category";
  const navigate = useNavigate();

  const editCategoriaResult = useMutation({
    mutationKey: ["editCategoria"],
    mutationFn: edit,
    onSuccess: () => {
      navigate(backPage);
    },
  });

  const categoriaResult = useQuery({
    queryKey: ["categoria", params.id],
    queryFn: () => getId(params.id || ""),
  });

  const onSubmit = (categoria: CategoriaServico) => {
    editCategoriaResult.mutateAsync(categoria);
  };

  const isLoading = useMemo(
    () => editCategoriaResult.isLoading || categoriaResult.isLoading,
    [editCategoriaResult.isLoading, categoriaResult.isLoading]
  );

  return (
    <div>
      <h3 className="text-2xl font-extrabold dark:text-white my-6">
        Incluir Categoria
      </h3>
      {isLoading ? (
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
