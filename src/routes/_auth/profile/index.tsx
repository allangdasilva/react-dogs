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

export const Route = createFileRoute("/_auth/profile/")({
  staticData: {
    title: "Posts",
  },
  loader: async ({ context }) => {
    const token = useAuthStore.getState().token;

    const user = await context.queryClient.ensureQueryData(
      userQueryOptions(token),
    );

    await context.queryClient.ensureInfiniteQueryData(
      photosInfiniteQueryOptions(user.id),
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const token = useAuthStore.getState().token;

  const { data: user } = useSuspenseQuery(userQueryOptions(token));

  const { data } = useSuspenseInfiniteQuery(
    photosInfiniteQueryOptions(user.id),
  );
  const photos = data.pages.flat();

  if (!photos.length) return <Posts />;
  return <Feed isProfile={true} userId={user.id} />;
}
