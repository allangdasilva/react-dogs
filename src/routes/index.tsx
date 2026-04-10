import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { userQueryOptions } from "../features/auth/api/queries/user.query,";
import { useAuthStore } from "../features/auth/store/auth.store";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const token = useAuthStore((s) => s.token);

  const { data: user } = useQuery(userQueryOptions(token));
  return (
    <div className={clsx("pt-36 xs:pt-19", { "xxs:pt-19": user })}>
      Hello "/"!
    </div>
  );
}
