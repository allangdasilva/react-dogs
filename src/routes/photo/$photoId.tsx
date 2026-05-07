import { createFileRoute, notFound } from "@tanstack/react-router";
import { photoQueryOptions } from "../../features/auth/api/queries/photo.query";
import PhotoPage from "../../components/$photo-id/PhotoPage";
import Loading from "../../components/helper/Loading";
import NotFound from "../../components/helper/NotFound";
import ErrorGeneral from "../../components/helper/ErrorGeneral";

export const Route = createFileRoute("/photo/$photoId")({
  pendingMs: 0,
  pendingMinMs: 300,
  // 1. BEFORELOAD: O "Porteiro".
  // Ele barra a entrada antes da rota sequer começar a carregar.
  beforeLoad: async ({ context, params }) => {
    const id = Number(params.photoId);
    if (isNaN(id)) throw notFound();

    try {
      // O ensureQueryData verifica o cache. Se não tiver, ele busca.
      // Se a API der 404 aqui, o catch pega e mata a navegação na hora.
      await context.queryClient.ensureQueryData(photoQueryOptions(id));
    } catch (error) {
      console.log(error);
      // Aqui o router entende: "Não entra nessa rota, mostra o Not Found".
      throw notFound();
    }
  },

  // 2. LOADER: O "Garçom".
  // Ele só roda se o beforeLoad passar.
  // Como o beforeLoad já deu 'ensureQueryData', o loader vai ler do CACHE instantaneamente.
  // ZERO requisições duplicadas na rede.
  // loader: É o lugar oficial para buscar dados que o componente vai usar.
  loader: async ({ context, params }) => {
    const id = Number(params.photoId);
    const data = await context.queryClient.ensureQueryData(
      photoQueryOptions(id),
    );
    return data.photo;
  },
  pendingComponent: Loading,
  // O notFoundComponent será disparado pelo "throw notFound()" acima
  notFoundComponent: () => <NotFound>Erro 404.</NotFound>,
  errorComponent: ErrorGeneral,
  head: ({ loaderData }) => {
    const photoTitle = loaderData?.title ?? "Foto";

    return {
      meta: [
        {
          name: "description",
          content: `Veja a foto de ${photoTitle}.`,
        },
        { title: `Dogs - ${photoTitle}` },
      ],
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <PhotoPage />;
}
