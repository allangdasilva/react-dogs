import { queryOptions } from "@tanstack/react-query";
import { fetchPhoto } from "../functions/get-photo";

export const photoQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ["photo", id],
    queryFn: () => fetchPhoto(id),
    staleTime: Infinity,
  });
};
