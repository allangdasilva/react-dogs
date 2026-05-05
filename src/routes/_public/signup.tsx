import { createFileRoute } from "@tanstack/react-router";
import Signup from "../../components/_public/signup/Signup";

export const Route = createFileRoute("/_public/signup")({
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Crie uma conta e entre em Dogs.",
      },
      { title: "Dogs - Criar Conta" },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Signup />;
}
