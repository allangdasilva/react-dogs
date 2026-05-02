import { createFileRoute } from "@tanstack/react-router";
import Signup from "../../components/_public/signup/Signup";

export const Route = createFileRoute("/_public/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Signup />;
}
