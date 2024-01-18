import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Loader from "../../../components/loader";
import { add } from "../../../services/clienteService";
import { Cliente } from "../../../domain/cliente";
import CustomerForm from "../../../components/records/customerForm";
import { useNotificationStore } from "../../../stores/notificationStore";
import { AxiosError } from "axios";

const AddCustomer = () => {
  const backPage = "/logged/records/customer";
  const navigate = useNavigate();
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const clienteResult = useMutation({
    mutationFn: add,
    onSuccess: () => {
      navigate(backPage);
      addNotification({
        message: "Cliente inserido!",
        type: "success",
      });
    },
    onError: (error: AxiosError) => {

      if (error.status === 400) {
        addNotification({
          message: JSON.stringify(error.response?.data),
          type: "error"
        })
      return
      }

      addNotification({
        message: "Erro ao inserir cliente.",
        type: "error"
      })
    }
  });

  const onSubmit = (cliente: Cliente) => {
    clienteResult.mutateAsync(cliente);
  };

  return (
    <div>
      <h3 className="text-2xl font-extrabold dark:text-white my-6">
        Incluir Cliente
      </h3>
      {clienteResult.isLoading ? (
        <Loader />
      ) : (
        <CustomerForm
          backCallback={() => navigate(backPage)}
          submitCallback={onSubmit}
          label="Adicionar"
        />
      )}
    </div>
  );
};

export default AddCustomer;
