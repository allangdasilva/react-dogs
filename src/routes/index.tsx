import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useAuthStore } from "../features/auth/store/auth.store";
import { fetchCurrentUser } from "../features/auth/api/get-user";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const token = useAuthStore((s) => s.token);

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: fetchCurrentUser,
    enabled: !!token,
    staleTime: Infinity,
  });
  return (
    <div className={clsx("pt-36 xs:pt-19", { "xxs:pt-19": user })}>
      Hello "/"!
    </div>
  );
}
