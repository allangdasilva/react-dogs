import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { userQueryOptions } from "../features/auth/api/queries/user.query,";
import { useAuthStore } from "../features/auth/store/auth.store";
import Feed from "../components/feed/Feed";
import { photosQueryOptions } from "../features/auth/api/queries/photos.query";

export const Route = createFileRoute("/")({
  // O LOADER: É o "porteiro" da rota. Ele entra em ação ANTES do componente aparecer na tela. O grande trunfo aqui é o "Data Fetching Parallelization": em vez de carregar a página para SÓ DEPOIS buscar os dados (o que gera aqueles esqueletos/spinners de carregamento), ele baixa os dados e o código da interface ao mesmo tempo.
  // Isso elimina o "delay" perceptível para o usuário.
  loader: ({ context }) =>
    // ensureQueryData:  Primeiro, ele olha se os dados que você quer já estão guardados no cache do TanStack Query. Se os dados estiverem lá e ainda forem válidos (não expiraram), ele os entrega na hora, sem precisar fazer uma nova requisição na rede. Se ele não encontrar nada ou se os dados estiverem "velhos", ele automaticamente vai até a API, busca as informações, guarda no cache e então entrega para o componente.
    context.queryClient.ensureQueryData(
      photosQueryOptions({ page: 1, total: 6, user: 0 }),
    ),
  component: RouteComponent,
  // PENDING COMPONENT: É exibido automaticamente pelo Router se o loader demorar mais que o 'pendingMs' (padrão 1s). Evita que a tela fique "travada" na navegação enquanto os dados não chegam, dando feedback imediato ao usuário.
  pendingComponent: LoadingPosts,
});

function RouteComponent() {
  const token = useAuthStore((s) => s.token);

  const { data: user } = useQuery(userQueryOptions(token));
  // USE SUSPENSE QUERY: Como o loader já garantiu que o dado existe (ou está sendo baixado), o Suspense elimina a necessidade de checar 'if (isLoading)'.
  // O benefício é um código muito mais limpo onde a variável 'data' é garantidamente definida.
  const { data: photos } = useSuspenseQuery(
    photosQueryOptions({ page: 1, total: 6, user: 0 }),
  );
  return (
    <div className={clsx("pt-36 xs:pt-19", { "xxs:pt-19": user })}>
      <Feed photos={photos} />
    </div>
  );
}

function LoadingPosts() {
  return <span>Loading...</span>;
}
