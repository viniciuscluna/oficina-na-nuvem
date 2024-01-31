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

      if (error.response?.status === 400) {
        // eslint-disable-next-line
        const errordata = error.response?.data as any[]
        addNotification({
          message: errordata?.map(errors=>errors.errorMensagem).join(","),
          type: "error",
          duration: 5000
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
      {clienteResult.isPending ? (
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
