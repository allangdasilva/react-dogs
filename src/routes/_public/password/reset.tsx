import { createFileRoute, redirect } from "@tanstack/react-router";
import z from "zod";
import PasswordReset from "../../../components/_public/password/reset/PasswordReset";

// Definimos exatamente o que esperamos na URL
const passwordResetSearchSchema = z.object({
  login: z.string().optional(),
  key: z.string().optional(),
});

export const Route = createFileRoute("/_public/password/reset")({
  // O Router agora valida a URL. Se não tiver key ou login, ele nem renderiza a página
  // O validateSearch roda ANTES de tudo. Se a URL não tiver 'login' e 'key',
  // o Zod lançaria um erro caso os parâmetros não correspondessem, mas como eles são opcional, o validateSearch verifica se existe ou não sem dar erro e passa pro beforeLoad, que por sua vez confirma se eles existem
  validateSearch: (search) => passwordResetSearchSchema.parse(search),
  beforeLoad: ({ search }) => {
    // Se algum dos dois estiver faltando, redireciona
    if (!search.login || !search.key) {
      // O redirect é usado fora do componente, dentro da configuração da rota. Ele acontece antes da página começar a ser montada ou renderizada. Onde usar: Em beforeLoad, loaders ou funções de busca de dados.
      // O navigate é usado dentro do componente ou em callbacks de eventos (como o seu onSuccess do TanStack Query). Ele acontece depois que o usuário já está "dentro" do ciclo de vida do React. Onde usar: Dentro de useEffect, funções de clique (onClick) ou após mutações de dados.
      throw redirect({
        to: "/password/lost",
        replace: true, // Substitui no histórico para o usuário não ficar preso no "voltar"
      });
    }
  },
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Resete sua senha da sua conta Dogs.",
      },
      { title: "Dogs - Resetar Senha" },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <PasswordReset />;
}
