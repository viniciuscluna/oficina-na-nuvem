import { useMemo } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../../../components/loader";
import { getId, edit } from "../../../services/clienteService";
import CustomerForm from "../../../components/records/customerForm";
import { PathCrudProps } from "../../../types/pathCrudProps";
import { useNotificationStore } from "../../../stores/notificationStore";
import { Cliente } from "../../../domain/cliente";

const EditCliente = () => {
  const params = useParams<PathCrudProps>();
  const backPage = "/logged/records/customer";
  const navigate = useNavigate();
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const editCustomerResult = useMutation({
    mutationFn: edit,
    onSuccess: () => {
      navigate(backPage);
      addNotification({
        message: "Cliente atualizado!",
        type: "success",
      });
    },
    onError: () => {
      addNotification({
        message: "Erro ao atualizar cliente.",
        type: "error"
      })
    }
  });

  const customerResult = useQuery({
    queryKey: ["cliente", params.id],
    queryFn: () => getId(params.id || ""),
  });

  const onSubmit = (cliente: Cliente) => {
    editCustomerResult.mutateAsync(cliente);
  };

  const isPending = useMemo(
    () => editCustomerResult.isPending || customerResult.isPending,
    [editCustomerResult.isPending, customerResult.isPending]
  );

  return (
    <div>
      <h3 className="text-2xl font-extrabold dark:text-white my-6">
        Editar Categoria
      </h3>
      {isPending ? (
        <Loader />
      ) : (
        <CustomerForm
          backCallback={() => navigate(backPage)}
          submitCallback={onSubmit}
          defaultValues={customerResult.data}
          label="Editar"
        />
      )}
    </div>
  );
};

export default EditCliente;
