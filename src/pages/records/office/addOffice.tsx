import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Loader from "../../../components/loader";
import { add } from "../../../services/filialService";
import { FilialServico } from "../../../domain/filialServico";
import  OfficeForm from "../../../components/records/officeForm";
import { useNotificationStore } from "../../../stores/notificationStore";

const AddOffice = () => {
  const backPage = "/logged/records/office";
  const navigate = useNavigate();
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const categoriaResult = useMutation({
    mutationFn: add,
    onSuccess: () => {
      navigate(backPage);
      addNotification({
        message: "Filial inserida!",
        type: "success",
      });
    },
    onError: () => {
      addNotification({
        message: "Erro ao inserir filial.",
        type: "error"
      })
    }
  });

  const onSubmit = (filial: FilialServico) => {
    console.log(filial)
    categoriaResult.mutateAsync(filial);
  };

  return (
    <div>
      <h3 className="text-2xl font-extrabold dark:text-white my-6">
        Incluir Filial
      </h3>
      {categoriaResult.isPending ? (
        <Loader />
      ) : (
        <OfficeForm
          backCallback={() => navigate(backPage)}
          submitCallback={onSubmit}
          label="Adicionar"
        />
      )}
    </div>
  );
};

export default AddOffice;
