export const cnpjFormater = (cnpj: string) => {
    // Remove todos os caracteres não numéricos do CNPJ
    const numericCnpj = cnpj.replace(/\D/g, '');

    // Aplica a máscara de CNPJ
    return numericCnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};