import { createFileRoute, Outlet } from "@tanstack/react-router";
import ProfileHeader from "../../../components/_auth/profile/ProfileHeader";
import NotFound from "../../../components/helper/NotFound";
import Spacer from "../../../components/common/Spacer";

export const Route = createFileRoute("/_auth/profile/_layout")({
  component: RouteComponent,
  notFoundComponent: () => <NotFound>Erro 404.</NotFound>,
});

// _layout no inicio dos arquivos quer dizer que todos eles vão usar esse layout aqui

function RouteComponent() {
  return (
    <>
      <ProfileHeader />
      <Spacer className="my-12 bg-neutral-dogs-200" />
      <Outlet />
    </>
  );
}
