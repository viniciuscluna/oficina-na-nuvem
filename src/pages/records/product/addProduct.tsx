import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Loader from "../../../components/loader";
import { add } from "../../../services/produtoService";
import { Produto } from "../../../domain/produto";
import ProductForm from "../../../components/records/productForm";
import { ETipoMedidaItem } from "../../../domain/ETipoMedidaItem";
import { useNotificationStore } from "../../../stores/notificationStore";

const AddProduct = () => {
  const backPage = "/logged/records/product";
  const navigate = useNavigate();
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const produtoResult = useMutation({
    mutationFn: add,
    onSuccess: () => {
      navigate(backPage);
      addNotification({
        message: "Produto inserido!",
        type: "success",
      });
    },
    onError: () => {
      addNotification({
        message: "Erro ao inserir produto.",
        type: "error"
      })
    }
  });

  const onSubmit = (produto: Produto) => {
    produtoResult.mutateAsync(produto);
  };

  return (
    <div>
      <h3 className="text-2xl font-extrabold dark:text-white my-6">
        Incluir Produto
      </h3>
      {produtoResult.isPending ? (
        <Loader />
      ) : (
        <ProductForm
          backCallback={() => navigate(backPage)}
          submitCallback={onSubmit}
          defaultValues={
            { tipoMedidaItem: ETipoMedidaItem.Litro, qtd: 1 } as Produto
          }
          label="Adicionar"
          editMode={false}
        />
      )}
    </div>
  );
};

export default AddProduct;
