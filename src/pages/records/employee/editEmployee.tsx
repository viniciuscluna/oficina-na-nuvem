import { useMemo } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../../../components/loader";
import { getId, edit } from "../../../services/prestadorService";
import { PathCrudProps } from "../../../types/pathCrudProps";
import EmployeeForm from "../../../components/records/employeeForm";
import { FuncionarioPrestador } from "../../../domain/funcionarioPrestador";

const EditEmployee = () => {
  const params = useParams<PathCrudProps>();
  const backPage = "/logged/records/employee";
  const navigate = useNavigate();

  const editEmployeeResult = useMutation({
    mutationFn: edit,
    onSuccess: () => {
      navigate(backPage);
    },
  });

  const employeeResult = useQuery({
    queryKey: ["employee", params.id],
    queryFn: () => getId(params.id || ""),
  });

  const onSubmit = (funcionario: FuncionarioPrestador) => {
    editEmployeeResult.mutateAsync(funcionario);
  };

  const isLoading = useMemo(
    () => editEmployeeResult.isLoading || employeeResult.isLoading,
    [editEmployeeResult.isLoading, employeeResult.isLoading]
  );

  return (
    <div>
      <h3 className="text-2xl font-extrabold dark:text-white my-6">
        Editar Funcionário
      </h3>
      {isLoading ? (
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
