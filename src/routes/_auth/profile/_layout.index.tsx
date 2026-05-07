import { createFileRoute } from "@tanstack/react-router";
import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Suspense } from "react";
import NoPosts from "../../../components/_auth/profile/posts/NoPosts";
import Feed from "../../../components/common/feed/Feed";
import Loading from "../../../components/helper/Loading";
import { useAuthStore } from "../../../features/auth/store/auth.store";
import { userQueryOptions } from "../../../features/auth/api/queries/user.query";
import { photosInfiniteQueryOptions } from "../../../features/auth/api/queries/photos.infiniteQuery";
import ErrorGeneral from "../../../components/helper/ErrorGeneral";

export const Route = createFileRoute("/_auth/profile/_layout/")({
  staticData: {
    title: "Posts",
  },
  // Importante usar errorComponent em todas rotas que possuem um loader ou usam useSuspenseQuery (ou seja, fazem requisição e a interface depende desses dados), É altamente recomendado!
  // Os benefícios de fazer isso em rotas específicas são:
  // UX Superior: Se a galeria de fotos falhar, o usuário ainda vê o Header, navega pelo Menu e pode tentar ir para o seu Perfil. O erro fica "preso" dentro do <Outlet/>.
  // Contexto: Você pode passar mensagens de erro mais específicas para aquela funcionalidade.
  errorComponent: ErrorGeneral,
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Veja todos os seus posts em Dogs.",
      },
      { title: "Dogs - Posts" },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  // useQuery:
  // Já vai estar no cache por causa do BeforeLoad do __root, ou seja, ele vem instantaneamente.
  const token = useAuthStore.getState().token;
  const { data } = useSuspenseQuery(userQueryOptions(token));

  return (
    // Usamos o Suspense do React para isolar esse componente do restante da rota e assim poder exibir o Loading da forma correta (Falta adicionar o componente de Error)
    <Suspense fallback={<Loading />}>
      <ProfileFeed userId={data.id} />
    </Suspense>
  );
}

function ProfileFeed({ userId }: { userId: number }) {
  // usa o useSuspenseInfintieQuery pois o Suspense do React já garantiu que o dados existem. e o restante segue a mesma lógica...
  const { data } = useSuspenseInfiniteQuery(photosInfiniteQueryOptions(userId));
  const photos = data.pages.flat();

  if (!photos.length) return <NoPosts />;

  return <Feed isProfile={true} userId={userId} />;
}
