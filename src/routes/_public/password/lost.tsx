import { createFileRoute } from "@tanstack/react-router";
import PasswordLost from "../../../components/_public/password/lost/PasswordLost";

export const Route = createFileRoute("/_public/password/lost")({
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Recupere sua conta Dogs informando seu username ou email.",
      },
      { title: "Dogs - Esqueceu a senha" },
    ],
  }),
  component: RouteComponent,
});

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
  return <PasswordLost />;
}
