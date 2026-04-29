import { createFileRoute } from "@tanstack/react-router";
import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import Posts from "../../../components/profile/posts/Posts";
import { useAuthStore } from "../../../features/auth/store/auth.store";
import { userQueryOptions } from "../../../features/auth/api/queries/user.query";
import Feed from "../../../components/feed/Feed";
import { photosInfiniteQueryOptions } from "../../../features/auth/api/queries/photos.infiniteQuery";
import { Suspense } from "react";
import Loading from "../../../components/helper/Loading";

export const Route = createFileRoute("/_auth/profile/_layout/")({
  staticData: {
    title: "Posts",
  },
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
  )
}

function ProfileFeed({ userId }: { userId: number }) {
  // usa o useSuspenseInfintieQuery pois o Suspense do React já garantiu que o dados existem. e o restante segue a mesma lógica...
  const { data } = useSuspenseInfiniteQuery(photosInfiniteQueryOptions(userId));
  const photos = data.pages.flat();

  if (!photos.length) return <Posts />;

  return <Feed isProfile={true} userId={userId} />;
}
