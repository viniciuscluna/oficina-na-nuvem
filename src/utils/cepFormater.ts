export const cepFormatter = (cep: string) => {
    // Remove todos os caracteres não numéricos do CEP
    const numericCep = cep.replace(/\D/g, '');

    // Aplica a máscara de CEP
    return numericCep.replace(/(\d{5})(\d{3})/, '$1-$2');
};