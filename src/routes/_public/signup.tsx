import { createFileRoute } from "@tanstack/react-router";
import Signup from "../../components/signup/Signup";

export const Route = createFileRoute("/_public/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Signup />;
}
