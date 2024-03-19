export const phoneFormater = (tel: string) => {
    // Remove todos os caracteres não numéricos do telefone
    const numericTel = tel.replace(/\D/g, '');
  
    // Aplica a máscara de telefone (##) #####-####
    const maskedTel = numericTel.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  
    return maskedTel;
  };