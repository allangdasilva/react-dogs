import { useEffect } from "react";
import { type ErrorComponentProps } from "@tanstack/react-router";
import clsx from "clsx";
import TitleBase from "../common/TitleBase";

type Props = ErrorComponentProps & {
  isRoot?: boolean;
};

// error (o erro em si)
// reset (uma função que limpa o estado da rota e tenta renderizar novamente).
const ErrorGeneral = ({ isRoot, error, reset }: Props) => {
  useEffect(() => {
    console.error("Erro capturado: ", error);
  }, []);

  return (
    <div
      className={clsx("error-not-found-wrapper", {
        "px-4 py-12": isRoot,
      })}
    >
      <TitleBase>Ops! Algo deu errado.</TitleBase>
      <div className="max-w-prose">
        <p className="paragraph-inline-700">
          Ocorreu um erro técnico ao carregar esta página. Pode ser uma
          instabilidade temporária na conexão.{" "}
        </p>
        <button
          type="button"
          className="font-body-base link-sm-underline-blue cursor-pointer"
          onClick={() => reset()}
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
};

export default ErrorGeneral;

/**
 * BENEFÍCIOS E ONDE USAR:
 *
 * 1. ONDE USAR: Deve ser passado para a propriedade `errorComponent` nas definições de rotas o TanStack Router (createFileRoute) ou globalmente no `__root.tsx`.
 *
 * 2. RESILIÊNCIA: O botão `reset()` permite que o usuário recupere a aplicação sem precisar dar F5 no navegador, o que é essencial em SPAs.
 *
 * 3. ISOLAMENTO: Ter um `errorComponent` impede que um erro em uma rota específica quebre o site inteiro. O erro fica "preso" dentro do layout daquela rota.
 */
