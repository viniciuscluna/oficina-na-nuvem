export const cpfFormater = (cpf: string) => {
    // Remove todos os caracteres não numéricos do CPF
    const numericCpf = cpf.replace(/\D/g, '');

    // Aplica a máscara de CPF
    return numericCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
 };