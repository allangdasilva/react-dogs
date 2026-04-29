import { createFileRoute, notFound } from "@tanstack/react-router";
import { photoQueryOptions } from "../../features/auth/api/queries/photo.query";
import Loading from "../../components/helper/Loading";
import PhotoPage from "../../components/photo-page/PhotoPage";
import NotFound from "../../components/helper/NotFound";

export const Route = createFileRoute("/photo/$id")({
  pendingMs: 0,
  pendingMinMs: 300,
  loader: async ({ context, params }) => {
    const id = Number(params.id);

    // 1. Validação imediata: se o ID não for um número, nem chama a API
    if (isNaN(id)) {
      throw notFound();
    }

    try {
      await context.queryClient.ensureQueryData(photoQueryOptions(id));
    } catch (error) {
      // 2. Se a API retornar 404 (recurso não existe), tratamos como Not Found
      // Isso evita que o erro suba para o errorComponent
      throw notFound();
    }
  },
  pendingComponent: Loading,
  // O notFoundComponent será disparado pelo "throw notFound()" acima
  notFoundComponent: () => <NotFound>Erro 404.</NotFound>,
  component: RouteComponent,
});

function RouteComponent() {
  return <PhotoPage />;
}
