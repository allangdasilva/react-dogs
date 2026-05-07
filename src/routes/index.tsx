import { createFileRoute } from "@tanstack/react-router";
import Loading from "../components/helper/Loading";
import { photosInfiniteQueryOptions } from "../features/auth/api/queries/photos.infiniteQuery";
import Feed from "../components/common/feed/Feed";
import ErrorGeneral from "../components/helper/ErrorGeneral";

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
  // aqui coloquei 300 → o loading fica visível por pelo menos esse tempo.
  //
  // uso comum:
  // - 300~500 → UX mais suave (loading não pisca)
  // - 0 → comportamento mais imediato (sem delay artificial)
  pendingMinMs: 0,
  loader: async ({ context }) => {
    // ensureInfiniteQueryData:
    // equivalente ao ensureQueryData, mas para infinite queries.
    // Ele usa cache se já existir; se não existir, faz o fetch da primeira página
    // e guarda o resultado como infinite query.
    // Aqui a ideia é garantir que as fotos já estejam prontas antes da rota renderizar o componente.
    await context.queryClient.ensureInfiniteQueryData(
      photosInfiniteQueryOptions(0),
    );
  },

  // pendingComponent:
  // esse componente aparece enquanto o loader ainda não terminou.
  // É o loading oficial da rota.
  pendingComponent: Loading,
  errorComponent: ErrorGeneral,
  component: RouteComponent,
});

function RouteComponent() {
  return <Feed userId={0} />;
}
