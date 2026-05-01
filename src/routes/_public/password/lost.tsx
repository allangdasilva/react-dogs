import { createFileRoute } from "@tanstack/react-router";
import PasswordLost from "../../../components/_public/password/lost/PasswordLost";

export const Route = createFileRoute("/_public/password/lost")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PasswordLost />;
}
