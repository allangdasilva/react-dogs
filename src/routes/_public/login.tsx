import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import Login from "../../components/_public/login/Login";

// search (redirect / ux)

// Definimos o que a URL de login pode aceitar
const loginSearchSchema = z.object({
  // redirect: z.string() Diz que, se o parâmetro redirect existir, ele obrigatoriamente deve ser uma string.
  // .optional() Indica que o usuário não precisa estar tentando ser redirecionado para entrar no login. Se ele digitar apenas /login, o objeto fica { redirect: undefined }. Sem o .optional(), o Router daria erro se você tentasse acessar o login sem o parâmetro na URL.
  // O .catch() diz ao Zod: "Se algo der errado na validação (ex: o valor for inválido ou estranho), não quebre a aplicação; apenas use uma string vazia "" como valor padrão".
  redirect: z.string().optional().catch(""),
});

export const Route = createFileRoute("/_public/login")({
  // validateSearch: É uma função que roda antes da rota carregar.
  // 'search': É um objeto que contém todos os parâmetros da URL (ex: ?redirect=/user&tema=dark)
  // O que ele faz: Ele pega esses parâmetros "crus" (Record<string, unknown>) e os passa pelo Zod.
  // Se o Zod validar (loginSearchSchema.parse), o Router tipa esses dados automaticamente.
  // Se falhar (ex: mandarem um número no redirect), o Zod/Router barram ou usam o valor padrão do .catch()
  validateSearch: (search) => loginSearchSchema.parse(search),
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Crie uma conta ou entre em Dogs.",
      },
      { title: "Dogs - Entrar" },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Login />;
}
