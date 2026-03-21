import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import Header from "../ui/Header";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Header />
      <div>Hello "__root"!</div>
      <Outlet />
    </React.Fragment>
  );
}
