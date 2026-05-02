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
    onSuccess: () => {
      // Aqui, a navegação instantânea evita que o usuário clique duas vezes no botão de enviar.
      // Sem await mandamos o usuário para a Home na mesma hora.
      // O 'invalidateQueries' marca a lista de fotos como "velha".
      // Quando a Home carregar, o TanStack Query verá que os dados são velhos
      // e buscará a lista nova (com a foto postada) automaticamente.
      queryClient.invalidateQueries({ queryKey: ["photos"] });

      // Só navegamos após garantir que o cache foi marcado como inválido
      navigate({ to: "/" });
    },
  });
};
