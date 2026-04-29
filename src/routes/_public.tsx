import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import React from "react";
import { useAuthStore } from "../features/auth/store/auth.store";
import NotFound from "../components/helper/NotFound";

// _auth.tsx (Layout): Não muda a URL. Serve apenas para aplicar a lógica de proteção via beforeLoad.
// As rotas dentro das pasta _public é o que o Outlet daqui renderiza
// rotas publica, ou seja, qualquer um pode acessar mesmo sem estar autorizado
export const Route = createFileRoute("/_public")({
  // beforeLoad é o porteiro da rota. Ele é uma função que roda antes de qualquer componente ser montado ou qualquer dado ser buscado. Se a condição (ter token) não for atendida, ele barra a entrada ali mesmo, economizando processamento e garantindo segurança.
  beforeLoad: () => {
    const isAuthenticated = useAuthStore.getState().token;
    if (isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  notFoundComponent: () => <NotFound>Erro 404.</NotFound>,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}
