import { EPrestacaoServicoStatus } from "../../../domain/ePrestacaoServicoStatus";

type BadgeProps = {
  status: EPrestacaoServicoStatus;
};

const Badge = ({ status }: BadgeProps) => {
  switch (status) {
    case EPrestacaoServicoStatus.aberto:
      return (
        <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
          Aberto
        </span>
      );
    case EPrestacaoServicoStatus.analise:
      return (
        <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
          Análise
        </span>
      );
    case EPrestacaoServicoStatus.andamento:
      return (
        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
          Andamento
        </span>
      );
    case EPrestacaoServicoStatus.aprovado:
      return (
        <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
          Aprovado
        </span>
      );
    case EPrestacaoServicoStatus.rejeitado:
      return (
        <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
          Rejeitado
        </span>
      );
    case EPrestacaoServicoStatus.concluido:
      return (
        <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
          Concluído
        </span>
      );
    case EPrestacaoServicoStatus.teste:
      return (
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
          Teste
        </span>
      );
  }
};

export default Badge;
