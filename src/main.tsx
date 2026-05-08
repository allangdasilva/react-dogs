import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen.ts";
import "./index.css";
import "./api/interceptors.ts";

const queryClient = new QueryClient();

const router = createRouter({
  // A 'routeTree' é o mapa gerado automaticamente de todas as suas rotas.
  routeTree,
  // Quando o usuário passa o mouse sobre um link, o roteador já começa a baixar
  defaultPreload: "intent",
  // Esta é a forma moderna de gerenciar o scroll. Ela garante que, ao voltar
  // para uma página anterior (como o Feed), o usuário retorne exatamente
  // para onde parou, em vez de voltar para o topo.
  scrollRestoration: true,
  // Aqui você injeta ferramentas externas nas suas rotas.
  // Ao passar o 'queryClient', você permite que o beforeLoad do __root.tsx
  // e de outras rotas usem o TanStack Query para fazer prefetch de dados.
  context: {
    queryClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
