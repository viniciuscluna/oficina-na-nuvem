import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Loader from "../../../components/loader";
import { add } from "../../../services/produtoService";
import { Produto } from "../../../domain/produto";
import ProductForm from "../../../components/records/productForm";

const AddProduct = () => {
  const backPage = "/logged/records/product";
  const navigate = useNavigate();

  const produtoResult = useMutation({
    mutationKey: ["addProduto"],
    mutationFn: add,
    onSuccess: () => {
      navigate(backPage);
    },
  });

  const onSubmit = (produto: Produto) => {
    produtoResult.mutateAsync(produto);
  };

  return (
    <div>
      <h3 className="text-2xl font-extrabold dark:text-white my-6">
        Incluir Produto
      </h3>
      {produtoResult.isLoading ? (
        <Loader />
      ) : (
        <ProductForm
          backCallback={() => navigate(backPage)}
          submitCallback={onSubmit}
          label="Adicionar"
          editMode={false}
        />
      )}
    </div>
  );
};

export default AddProduct;
