import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/profile/_layout/statistics")({
  staticData: {
    title: "Dados",
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_auth/user/statistics"!</div>;
}
