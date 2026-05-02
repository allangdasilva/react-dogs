import { createFileRoute, notFound } from "@tanstack/react-router";
import { photosInfiniteQueryOptions } from "../features/auth/api/queries/photos.infiniteQuery";
import Loading from "../components/helper/Loading";
import ProfileId from "../components/$profile-id/ProfileId";

export const Route = createFileRoute("/$profileId")({
  pendingMs: 0,
  pendingMinMs: 300,
  loader: async ({ context, params }) => {
    // 1. Buscamos os dados normalmente
    const data = await context.queryClient.ensureInfiniteQueryData(
      photosInfiniteQueryOptions(params.profileId),
    );
    // 2. Pegamos a primeira foto da primeira página
    const firstPhoto = data.pages[0]?.[0];

    // 3. Na API da Origamid, cada foto tem um campo 'author'.
    // Se o profileId da URL for diferente do author da foto que veio,
    // significa que a API ignorou seu filtro e mandou o feed geral.
    if (firstPhoto && firstPhoto.author !== params.profileId) {
      throw notFound();
    }

    // Caso o usuário exista mas não tenha NENHUMA foto:
    // A API retornará um array vazio [].
  },
  pendingComponent: Loading,
  component: RouteComponent,
});

function RouteComponent() {
  return <ProfileId />;
}
