import { CadastroPrestacaoValidation } from "../domain/Validations/cadastroPrestracaoValidation";
import { PrestacaoServico } from "../domain/prestacaoServico";

export const ValidationFormServico = (form: PrestacaoServico): CadastroPrestacaoValidation => {

    const validatorForm: CadastroPrestacaoValidation = {
        validation: true,
        menssagens: "Validado com sucesso!"
    };

    if (form === null || form === undefined) {
        validatorForm.validation = false;
        validatorForm.menssagens = "Nenhum campo preenchido!"
        return validatorForm;
    }

    if (form.funcionarioPrestadorId === null || form.funcionarioPrestadorId === undefined) {
        validatorForm.validation = false;
        validatorForm.menssagens = "Por favor verificar se o funcionario está selecionado!"
        return validatorForm;
    }

    if ((form.cliente === null || form.cliente === undefined) && (form.clienteId === undefined || form.clienteId === undefined)) {
        validatorForm.validation = false;
        validatorForm.menssagens = "Por favor verificar se o cliente está preenchido ou selecionado!"
        return validatorForm;
    }

    if ((form.veiculo === null || form.veiculo === undefined) && (form.veiculoId === undefined || form.veiculoId === undefined)) {
        validatorForm.validation = false;
        validatorForm.menssagens = "Por favor verificar se o carro está preenchido ou selecionado!"
        return validatorForm;
    }

    return validatorForm;
}