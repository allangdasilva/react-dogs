import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useQuery, type QueryClient } from "@tanstack/react-query";
import * as React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuthStore } from "../features/auth/store/auth.store";
import { userQueryOptions } from "../features/auth/api/queries/user.query";
import ToastProvider from "../components/helper/ToastProvider";
import clsx from "clsx";

interface RootRouteContext {
  queryClient: QueryClient;
}

// O arquivo __root.tsx é obrigatório no TanStack Router pois define a base da sua árvore de navegação e fornece o componente <Outlet /> necessário para renderizar todas as outras rotas da aplicação, funcionando como o ponto de partida onde o roteador acopla seus layouts e páginas.
// Ele é o "Pai de Todos". O <main> e o <nav> aqui aparecerão em todas as páginas do site (Login, Cadastro, Perfil, etc). O <Outlet /> aqui é o espaço reservado para as rotas filhas (_auth ou _public, pois esse site tem 2 tipos de rotas, ou é pública ou é privada, e ele terão o outlet deles que renderizarão o filhos/rotas delas).

// Essa função cria a rota raiz, mas permite que você defina quais dados externos (contexto) ela precisa. É como dizer ao roteador: "Para este app funcionar, eu preciso que você me forneça o QueryClient e as informações de Autenticação".
export const Route = createRootRouteWithContext<RootRouteContext>()({
  // Imagine (Login): Usuário digita senha -> useMutation -> setToken -> fetchQuery(user) -> redirect('/').
  // Imagine (F5 / Nova Aba): O usuário já tem o token no localStorage. O site carrega direto na index. O beforeLoad da __root precisa validar esse token e pegar o usuário.
  beforeLoad: async ({ context }) => {
    const token = useAuthStore.getState().token;
    // Se tem token (token pode ter, pois ele fica no localStorage) mas não temos os dados do user no cache (lembrando que o cache do Tanstack query morre ao fechar a aba), daí ocorre esse try
    if (token) {
      try {
        // ensureQueryData? Ele é um método "inteligente". Ele verifica: "Eu já tenho esse dado no cache e ele ainda é válido?".
        // Se sim, ele retorna o dado do cache instantaneamente (não faz requisição).
        // Se não, ele faz a requisição, salva no cache e depois retorna o dado.
        await context.queryClient.ensureQueryData(userQueryOptions(token));
      } catch {
        // Se der erro (token expirado/token errado), limpa tudo
        useAuthStore.getState().logout();
        // limpa o cache, só pra garantir
        context.queryClient.clear();
      }
    }
  },
  component: RootComponent,
});

function RootComponent() {
  const token = useAuthStore((s) => s.token);

  // useQuery:
  // Já vai estar no cache por causa do BeforeLoad do __root, ou seja, ele vem instantaneamente.
  const { data: user } = useQuery(userQueryOptions(token));
  return (
    <React.Fragment>
      <Header />
      <main
        className={clsx("pt-36 xs:pt-19", {
          "xxs:pt-19": user,
        })}
      >
        <Outlet />
      </main>
      <Footer />
      <ToastProvider />
      <TanStackRouterDevtools />
    </React.Fragment>
  );
}
