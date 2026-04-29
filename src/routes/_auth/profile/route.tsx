import { createFileRoute, Outlet } from "@tanstack/react-router";
import NotFound from "../../../components/helper/NotFound";

export const Route = createFileRoute("/_auth/profile")({
  notFoundComponent: () => <NotFound>Erro 404.</NotFound>,
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
