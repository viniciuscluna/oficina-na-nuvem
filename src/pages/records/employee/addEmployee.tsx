import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Loader from "../../../components/loader";
import { add } from "../../../services/prestadorService";
import { FuncionarioPrestador } from "../../../domain/funcionarioPrestador";
import EmployeeForm from "../../../components/records/employeeForm";

const AddEmployee = () => {
  const backPage = "/logged/records/employee";
  const navigate = useNavigate();

  const funcionarioResult = useMutation({
    mutationFn: add,
    onSuccess: () => {
      navigate(backPage);
    },
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
