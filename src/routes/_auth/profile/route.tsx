import { createFileRoute, Outlet } from "@tanstack/react-router";
import React from "react";
import ProfileHeader from "../../../components/profile/ProfileHeader";

export const Route = createFileRoute("/_auth/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <React.Fragment>
      <div className="min-h-dvh">
        <ProfileHeader />
        <Outlet />
      </div>
    </React.Fragment>
  );
}
