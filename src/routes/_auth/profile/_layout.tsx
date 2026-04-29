import { createFileRoute, Outlet } from "@tanstack/react-router";
import React from "react";
import ProfileHeader from "../../../components/profile/ProfileHeader";
import Spacer from "../../../components/Spacer";
import NotFound from "../../../components/helper/NotFound";

export const Route = createFileRoute("/_auth/profile/_layout")({
  component: RouteComponent,
  notFoundComponent: () => <NotFound>Erro 404.</NotFound>,
});

// _layout no inicio dos arquivos quer dizer que todos eles vão usar esse layout aqui

function RouteComponent() {
  return (
    <React.Fragment>
      <ProfileHeader />
      <Spacer className="my-12 bg-base-200" />
      <Outlet />
    </React.Fragment>
  );
}
