import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/axios";
import { useNavigate } from "@tanstack/react-router";
import { isAxiosError } from "axios";

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
        if (isAxiosError(error)) {
          // Erro de Resposta (error.response): O servidor recebeu seu pedido e respondeu com um status de erro (400, 401, 500, etc.).
          // Aqui o apiMessage pode ou não existir.
          // CASO A: O servidor respondeu com um erro (4xx, 5xx)
          if (error.response) {
            const apiMessage = error.response?.data?.message;
            throw new Error(
              apiMessage || "Erro ao processar os dados da foto.",
            );
          }
          // Erro de Requisição (error.request): A requisição foi feita, mas não houve resposta (servidor fora do ar, erro de DNS, timeout).
          // Aqui o error.response é undefined.
          // CASO B: A requisição foi feita mas o servidor não respondeu (Rede/CORS/Offline)
          if (error.request) {
            throw new Error(
              "Servidor fora do ar ou erro de conexão. Verifique sua internet.",
            );
          }
        }
        // CASO C: Erro catastrófico ou de lógica no JS (algo que nem chegou a ser uma requisição)
        throw new Error(
          "Ocorreu um erro ao tentar postar. Tente novamente mais tarde.",
        );
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
