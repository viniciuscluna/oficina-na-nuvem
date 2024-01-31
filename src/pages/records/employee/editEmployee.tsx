import { useMemo } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../../../components/loader";
import { getId, edit } from "../../../services/prestadorService";
import { PathCrudProps } from "../../../types/pathCrudProps";
import EmployeeForm from "../../../components/records/employeeForm";
import { FuncionarioPrestador } from "../../../domain/funcionarioPrestador";
import { useNotificationStore } from "../../../stores/notificationStore";

const EditEmployee = () => {
  const params = useParams<PathCrudProps>();
  const backPage = "/logged/records/employee";
  const navigate = useNavigate();
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const editEmployeeResult = useMutation({
    mutationFn: edit,
    onSuccess: () => {
      navigate(backPage);
      addNotification({
        message: "Funcionário atualizado!",
        type: "success",
      });
    },
    onError: () => {
      addNotification({
        message: "Erro ao atualizar funcionário.",
        type: "error"
      })
    }
  });

  const employeeResult = useQuery({
    queryKey: ["employee", params.id],
    queryFn: () => getId(params.id || ""),
  });

  const onSubmit = (funcionario: FuncionarioPrestador) => {
    editEmployeeResult.mutateAsync(funcionario);
  };

  const isPending = useMemo(
    () => editEmployeeResult.isPending || employeeResult.isPending,
    [editEmployeeResult.isPending, employeeResult.isPending]
  );

  return (
    <div>
      <h3 className="text-2xl font-extrabold dark:text-white my-6">
        Editar Funcionário
      </h3>
      {isPending ? (
        <Loader />
      ) : (
        <EmployeeForm
          backCallback={() => navigate(backPage)}
          submitCallback={onSubmit}
          defaultValues={employeeResult.data}
          label="Editar"
        />
      )}
    </div>
  );
};

export default EditEmployee;
