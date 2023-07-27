import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Loader from "../../../components/loader";
import { add } from "../../../services/categoriaService";
import { CategoriaServico } from "../../../domain/categoriaServico";
import CategoryForm from "../../../components/records/categoryForm";

const AddCategory = () => {
  const backPage = "/logged/records/category";
  const navigate = useNavigate();

  const categoriaResult = useMutation({
    mutationKey: ["addCategoria"],
    mutationFn: add,
    onSuccess: () => {
      navigate(backPage);
    },
  });

  const onSubmit = (subServico: CategoriaServico) => {
    categoriaResult.mutateAsync(subServico);
  };

  return (
    <div>
      <h3 className="text-2xl font-extrabold dark:text-white my-6">
        Incluir Categoria
      </h3>
      {categoriaResult.isLoading ? (
        <Loader />
      ) : (
        <CategoryForm
          backCallback={() => navigate(backPage)}
          submitCallback={onSubmit}
          label="Adicionar"
        />
      )}
    </div>
  );
};

export default AddCategory;
