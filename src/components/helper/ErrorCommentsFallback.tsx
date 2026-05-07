// Quando você passa um componente para o FallbackComponent da biblioteca react-error-boundary, ela injeta automaticamente essas duas propriedades para você: error, resetErrorBoundary.
// error: É o objeto de erro real que foi disparado (o erro do Zod, o erro 500 do Axios, etc.). Se você só quer um aviso genérico ("Ops, algo deu errado"), você acaba ignorando ele no código, mas ele está lá.

import { useEffect } from "react";

// resetErrorBoundary: É uma função que, quando chamada, diz ao ErrorBoundary: "Ei, limpa esse estado de erro e tenta renderizar os meus filhos (o ModalComments) de novo". Ele tenta dar um "reboot" no componente que quebrou. O problema: Se você apenas clicar no botão e não fizer nada com o TanStack Query, o componente vai tentar montar, vai ver que a query ainda está com erro no cache e vai "quebrar" instantaneamente de novo. É um loop infinito de erro. É aí que entra o onReset.
const ErrorCommentsFallback = ({ error, resetErrorBoundary }: any) => {
  useEffect(() => {
    console.error("Erro capturado: ", error);
  }, []);

  return (
    <div className="mt-2">
      <p className="paragraph-inline-700">
        Não foi possível carregar os comentários.{" "}
      </p>
      <button
        type="button"
        className="font-body-base link-sm-underline-blue cursor-pointer"
        onClick={resetErrorBoundary} // Ao clicar, ele chama o onReset
      >
        Tentar novamente
      </button>
    </div>
  );
};

export default ErrorCommentsFallback;
