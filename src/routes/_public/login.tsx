import { createFileRoute } from "@tanstack/react-router";
import Login from "../../components/login/Login";
import z from "zod/v3";

// search (redirect / ux)

// Definimos o que a URL de login pode aceitar
const loginSearchSchema = z.object({
  // redirect: z.string() Diz que, se o parâmetro redirect existir, ele obrigatoriamente deve ser uma string.
  // .optional() Indica que o usuário não precisa estar tentando ser redirecionado para entrar no login. Se ele digitar apenas /login, o objeto fica { redirect: undefined }. Sem o .optional(), o Router daria erro se você tentasse acessar o login sem o parâmetro na URL.
  // O .catch() diz ao Zod: "Se algo der errado na validação (ex: o valor for inválido ou estranho), não quebre a aplicação; apenas use uma string vazia "" como valor padrão".
  redirect: z.string().optional().catch(""),
});

export const Route = createFileRoute("/_public/login")({
  validateSearch: (search) => loginSearchSchema.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  return <Login />;
}
