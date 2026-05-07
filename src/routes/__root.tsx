import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useQuery, type QueryClient } from "@tanstack/react-query";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuthStore } from "../features/auth/store/auth.store";
import { userQueryOptions } from "../features/auth/api/queries/user.query";
import ToastProvider from "../components/helper/ToastProvider";
import clsx from "clsx";
import NotFound from "../components/helper/NotFound";
import ErrorGeneral from "../components/helper/ErrorGeneral";

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
  notFoundComponent: () => <NotFound>Erro 404.</NotFound>,
  // Sempre colocar um errorComponent no seu arquivo raiz. Ele serve como a última linha de defesa. Se algo der um erro catastrófico que nem as rotas filhas conseguiram prever, ele impede que o navegador exiba aquela tela branca de erro nativa do React.
  // O que não anula o fato de usar errorComponent em todas rotas que possuem um loader ou usam useSuspenseQuery (ou seja, fazem requisição e a interface depende desses dados), É altamente recomendado!
  errorComponent: ({ error, reset }) => (
    <ErrorGeneral isRoot={true} error={error} reset={reset} />
  ),
  head: () => ({
    meta: [
      {
        name: "description", // name: É o nome da etiqueta (a chave). Diz ao navegador ou ao Google que tipo de informação é aquela.
        content: "Compartilhe fotos do seu pet com as pessoas.", // content: É o texto escrito na etiqueta (o valor). É a informação propriamente dita.
      },
      {
        // Remova <title> e o favicon do index.html, pois quando você usa o TanStack Router para gerenciar o head, ele passa a ser o "dono" dessas informações.
        title: "Dogs",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.svg",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  const token = useAuthStore((s) => s.token);

  const { data: user } = useQuery(userQueryOptions(token));
  return (
    <>
      {/* 
        1. HEADCONTENT: Vai SEMPRE no topo. 
        Ele "teletransporta" o título, as metas e os links lá para o <head> do seu navegador.
      */}
      <HeadContent />

      {/* 2. LAYOUT VISÍVEL: Tudo o que o usuário vê na tela */}
      <Header />
      <main
        className={clsx("w-full max-w-base px-4 pb-12 pt-48 xs:pt-31", {
          "xxs:pt-31": user,
        })}
      >
        <Outlet />
      </main>
      <Footer />
      <ToastProvider />

      {/* 
        3. SCRIPTS E DEVTOOLS: Vão no final.
        Eles carregam a lógica pesada depois que o visual já está pronto.
      */}
      <Scripts />
      <TanStackRouterDevtools />
    </>
  );
}
