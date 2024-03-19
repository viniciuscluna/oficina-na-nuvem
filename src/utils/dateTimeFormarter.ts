export const dateTimeFormarter = (date: string) => {
    // Converta a string de data em um objeto Date
    const parsedDate = new Date(date);
  
    // Obtém o dia, mês e ano
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Mês começa do zero, então adicionamos 1
    const year = parsedDate.getFullYear();
  
    // Formata a data como "dd-mm-aaaa"
    const formattedDate = `${day}-${month}-${year}`;
  
    return formattedDate;
  };