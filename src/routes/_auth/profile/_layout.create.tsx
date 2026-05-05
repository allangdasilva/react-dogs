import { createFileRoute } from "@tanstack/react-router";
import Create from "../../../components/_auth/profile/create/Create";

export const Route = createFileRoute("/_auth/profile/_layout/create")({
  // No TanStack Router, cada rota pode ter metadados. Você pode acessar todos os "matches" ativos e pegar o último (que é a rota atual).
  staticData: {
    title: "Criar", // Cria um campo customizado. Dai no seu componente de desejado, você busca esse dado acessando os matches ativos
  },
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Compartilhe fotos do seu pet.",
      },
      { title: "Dogs - Criar" },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Create />;
}
