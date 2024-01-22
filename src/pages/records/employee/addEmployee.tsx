import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Loader from "../../../components/loader";
import { add } from "../../../services/prestadorService";
import { FuncionarioPrestador } from "../../../domain/funcionarioPrestador";
import EmployeeForm from "../../../components/records/employeeForm";
import { useNotificationStore } from "../../../stores/notificationStore";
import { AxiosError } from "axios";

const AddEmployee = () => {
  const backPage = "/logged/records/employee";
  const navigate = useNavigate();
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const funcionarioResult = useMutation({
    mutationFn: add,
    onSuccess: () => {
      navigate(backPage);
      addNotification({
        message: "Funcionário inserido!",
        type: "success",
      });
    },
    onError: (error: AxiosError) => {

      if (error.response?.status === 400) {
        const errordata = error.response?.data as any[]
        addNotification({
          message: errordata?.map(errors=>errors.errorMensagem).join(","),
          type: "error",
          duration: 5000
        })
      return
      }

      addNotification({
        message: "Erro ao inserir funcionário.",
        type: "error"
      })
    }
  });

  const onSubmit = (funcionario: FuncionarioPrestador) => {
    funcionarioResult.mutateAsync(funcionario);
  };

  return (
    <div>
      <h3 className="text-2xl font-extrabold dark:text-white my-6">
        Incluir Funcionário
      </h3>
      {funcionarioResult.isLoading ? (
        <Loader />
      ) : (
        <EmployeeForm
          backCallback={() => navigate(backPage)}
          submitCallback={onSubmit}
          label="Adicionar"
        />
      )}
    </div>
  );
};

export default AddEmployee;
