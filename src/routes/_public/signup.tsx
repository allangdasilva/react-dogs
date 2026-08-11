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

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
  return <Signup />;
}
