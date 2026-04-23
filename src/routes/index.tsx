import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { userQueryOptions } from "../features/auth/api/queries/user.query";
import { useAuthStore } from "../features/auth/store/auth.store";
import { photosQueryOptions } from "../features/auth/api/queries/photos.query";
import Feed from "../components/feed/Feed";
import Loading from "../components/helper/Loading";

export const Route = createFileRoute("/")({
  // pendingMs:
  // tempo (em ms) que o router espera ANTES de mostrar o pendingComponent
  //
  // padrão ~1000ms → evita mostrar loading em requisições rápidas
  // aqui você colocou 0 → o loading aparece imediatamente
  //
  // uso comum:
  // - 0 → sempre mostrar loading (bom pra UX consistente)
  // - 200~300 → evita flicker em requisições rápidas
  pendingMs: 0,

  // pendingMinMs:
  // tempo mínimo que o loading deve ficar visível DEPOIS que apareceu
  //
  // evita aquele efeito de "piscar" (loading aparece e some muito rápido)
  //
  // aqui você colocou 0 → assim que o loader termina, o loading some na hora
  //
  // uso comum:
  // - 300~500 → UX mais suave (loading não pisca)
  // - 0 → comportamento mais imediato (sem delay artificial)
  pendingMinMs: 300,
  loader: async ({ context }) => {
    // ensureQueryData:
    // - se os dados já estiverem no cache, usa eles
    // - se não estiverem, faz o fetch e salva no cache do React Query
    //
    // Aqui a ideia é garantir que as fotos já estejam prontas
    // antes da rota renderizar o componente.
    await context.queryClient.ensureQueryData(
      photosQueryOptions({ page: 1, total: 6, user: 0 }),
    );
  },

  // pendingComponent:
  // esse componente aparece enquanto o loader ainda não terminou.
  // É o loading oficial da rota.
  pendingComponent: Loading,

  component: RouteComponent,
});

function RouteComponent() {
  const token = useAuthStore((s) => s.token);

  // useQuery:
  // aqui eu deixei o user separado porque ele está sendo usado só para estilo.
  // Ele pode carregar em paralelo sem bloquear o feed.
  const { data: user } = useQuery(userQueryOptions(token));

  // useSuspenseQuery:
  // como o loader já garantiu que as fotos existem no cache,
  // useSuspenseQuery lê o dado pronto e não precisa lidar com "loading" manual aqui.
  const { data: photos } = useSuspenseQuery(
    photosQueryOptions({ page: 1, total: 6, user: 0 }),
  );

  return (
    <div className={clsx("pt-36 xs:pt-19", { "xxs:pt-19": user })}>
      <Feed photos={photos} />
    </div>
  );
}
