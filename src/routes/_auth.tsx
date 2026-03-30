import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "../features/auth/store/auth.store";

// _auth.tsx (Layout): Não muda a URL. Serve apenas para aplicar a lógica de proteção via beforeLoad.
// As rotas dentro das pasta _auth é o que o Outlet daqui renderiza
// _auth.tsx e _public.tsx: Como já tem o Header, Footer e main no Root, aqui só precisa do <Outlet /> se não quiser adicionar um layout específico para essas áreas (como uma barra lateral apenas para logados). O <Outlet /> aqui serve para renderizar as páginas finais (como user.tsx ou login.tsx).
// rotas autenticada, ou seja, apenas usuários autenticado podem acessar
export const Route = createFileRoute("/_auth")({
  // beforeLoad é o porteiro da rota. Ele é uma função que roda antes de qualquer componente ser montado ou qualquer dado ser buscado. Se a condição (não ter token) for atendida, ele barra a entrada ali mesmo, economizando processamento e garantindo segurança.
  beforeLoad: () => {
    const isAuthenticated = useAuthStore.getState().token;

    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
        // search é para a experiência do usuário
        // UX: Salvamos a URL que o usuário tentou acessar (ex: /settings), para que, após o login, possamos mandá-lo de volta para lá.
        // imagine que ele recebeu um link de uma imagem (apenas exemplo), só que ele está deslogado e não conseguiu acessa-la, quando ele fizer o login, ele será redirecionado diretamente para lá ao invés de '/' (rota padrão)
        // Para que o tanstack aceite o search: { redirect: ... } na URL do login, você precisa definir que a rota de Login espera esse parâmetro.
        search: { redirect: location.pathname },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_auth"!</div>;
}
