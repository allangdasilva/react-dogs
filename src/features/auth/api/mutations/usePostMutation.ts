import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { api } from "../../../../api/axios";
import { handleApiError } from "../functions/handleApiError";

export const usePostMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      try {
        const response = await api.post("/api/photo", formData);

        // Retornamos os dados, mas como não vamos usá-los para renderizar nada
        // agora, não precisamos de um parse rigoroso do Zod aqui.
        return response.data;
      } catch (error) {
        handleApiError(error, "Erro ao processar os dados da foto.");
      }
    },
    onSuccess: async () => {
      // Por que fazer isso? O TanStack Query guarda as fotos em cache para evitar requests extras. Quando postamos uma foto nova, o cache antigo da "home" ou "lista de fotos" está desatualizado.
      // O invalidateQueries avisa ao QueryClient: "As fotos que você tem aí não valem mais, busque de novo".
      // Assim, ao navegar para "/", o usuário verá a foto nova instantaneamente.
      await queryClient.invalidateQueries({ queryKey: ["photos"] });

      // Só navegamos após garantir que o cache foi marcado como inválido
      navigate({ to: "/" });
    },
  });
};
