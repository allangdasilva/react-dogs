import { createFileRoute } from "@tanstack/react-router";

// _auth/user.tsx (Página): É o conteúdo real. Como está dentro da pasta _auth, ela "herda" a proteção do layout pai.

export const Route = createFileRoute("/_auth/user")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_auth/user"!</div>;
}
