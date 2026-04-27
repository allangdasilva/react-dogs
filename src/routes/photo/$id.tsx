import { createFileRoute } from "@tanstack/react-router";
import { photoQueryOptions } from "../../features/auth/api/queries/photo.query";
import Loading from "../../components/helper/Loading";
import PhotoPage from "../../components/photo-page/PhotoPage";

export const Route = createFileRoute("/photo/$id")({
  pendingMs: 0,
  pendingMinMs: 300,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      photoQueryOptions(Number(params.id)),
    );
  },
  pendingComponent: Loading,
  component: RouteComponent,
});

function RouteComponent() {
  return <PhotoPage />;
}
