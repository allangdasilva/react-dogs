import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api } from "../../../../api/axios";

export const usePhotoDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // O correto é deixar o TanStack Query lidar com o erro e usar o onError do useMutation para disparar o toast.error().
    // Por quê? Se você trata o erro dentro da mutationFn, o TanStack Query acha que a função "acabou bem" e não dispara o onError.
    mutationFn: async (id: number) => {
      const response = await api.delete(`/api/photo/${id}`);
      return response.data;
    },
    onSuccess: async (_data) => {
      await queryClient.invalidateQueries({ queryKey: ["photos"] });
      toast.success("Foto deletada com sucesso!");
    },
    onError: (_error) => {
      // Use o onError para EFEITOS (Toasts, logs externos, etc)
      // Não dê 'throw' aqui.
      toast.error("Não foi possível apagar a foto.");
    },
  });
};
