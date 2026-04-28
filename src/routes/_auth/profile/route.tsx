import { createFileRoute, Outlet } from "@tanstack/react-router";
import React from "react";
import ProfileHeader from "../../../components/profile/ProfileHeader";
import Spacer from "../../../components/Spacer";

export const Route = createFileRoute("/_auth/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <React.Fragment>
      <ProfileHeader />
      <Spacer className="my-12 bg-base-200" />
      <Outlet />
    </React.Fragment>
  );
}
