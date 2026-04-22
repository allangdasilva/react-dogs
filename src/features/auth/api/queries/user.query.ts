import { queryOptions } from "@tanstack/react-query";
import { type Token } from "../../store/auth.store";
import { fetchCurrentUser } from "../functions/get-user";

export const userQueryOptions = (token: Token) => {
  return queryOptions({
    // "user", token], cada usuário terá seu próprio "espaço" de cache
    queryKey: ["user", token],
    queryFn: fetchCurrentUser,
    enabled: !!token, // evita que ele tente buscar sem token
    // staledTime: Infinity garante que ele use o que está no cache sem refetch imediato
    staleTime: Infinity,
  });
};
