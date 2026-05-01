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
      throw redirect({
        to: "/password/lost",
        replace: true, // Substitui no histórico para o usuário não ficar preso no "voltar"
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <PasswordReset />;
}
