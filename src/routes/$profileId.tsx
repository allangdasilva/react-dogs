import { createFileRoute } from "@tanstack/react-router";
import { photosInfiniteQueryOptions } from "../features/auth/api/queries/photos.infiniteQuery";
import Loading from "../components/helper/Loading";
import ProfileId from "../components/profile/profile-id/ProfileId";

export const Route = createFileRoute("/$profileId")({
  pendingMs: 0,
  pendingMinMs: 300,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureInfiniteQueryData(
      photosInfiniteQueryOptions(params.profileId),
    );
  },
  pendingComponent: Loading,
  component: RouteComponent,
});

function RouteComponent() {
  return <ProfileId />;
}
