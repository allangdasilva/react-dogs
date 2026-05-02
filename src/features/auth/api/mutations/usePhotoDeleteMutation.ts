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
    onSuccess: (_data) => {
      // Com await: API deleta a foto (500ms) -> QueryClient busca a lista nova (800ms) -> Total: 1.3 segundos de botão "carregando" até o usuário ver o sucesso.
      // Sem await (Seu código agora): API deleta a foto (500ms) -> Total: 0.5 segundos e o usuário já recebeu o Toast e o botão liberou. (A busca da lista nova continua rodando no fundo).
      // Existe apenas um cenário onde o await é bem-vindo no onSuccess: quando a próxima ação do usuário depende obrigatoriamente do dado novo estar lá.

      // Não usamos await aqui para que o Toast apareça na hora.
      // O invalidateQueries avisa ao cache para atualizar, mas o usuário não
      // precisa ficar esperando a nova lista chegar para saber que deu certo.
      queryClient.invalidateQueries({ queryKey: ["photos"] });
      toast.success("Foto deletada com sucesso!");
    },
    onError: (_error) => {
      toast.error("Não foi possível apagar a foto.");
    },
  });
};
