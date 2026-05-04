import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api } from "../../../../api/axios";
import { useNavigate } from "@tanstack/react-router";

export const usePhotoDeleteMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    // O correto é deixar o TanStack Query lidar com o erro e usar o onError do useMutation para disparar o toast.error().
    // Por quê? Se você trata o erro dentro da mutationFn, o TanStack Query acha que a função "acabou bem" e não dispara o onError.
    mutationFn: async (id: number) => {
      const response = await api.delete(`/api/photo/${id}`);
      return response.data;
    },
    onSuccess: async (_data) => {
      // AÇÃO ASSÍNCRONA (Com await): invalidateQueries orquestra uma nova requisição de rede, Ele avisa ao cache que os dados daquela chave (ex: ["photos"]) não são mais confiáveis. E Se o componente que usa essa query estiver ativo na tela (montado), o TanStack Query dispara imediatamente uma nova requisição via rede para buscar os dados atualizados.
      // (curiosidade sobre invalidateQueries: Ele dispara um requisição, desde que haja alguém "ouvindo" ou "precisando" daqueles dados na tela atual. Caso o usuário não esteja na tela que exibe a query que foi invalidada, ele apenas agenda a atualização para a próxima vez que a tela for aberta.)
      await queryClient.invalidateQueries({ queryKey: ["photos"] });
      toast.success("Foto deletada com sucesso!");

      // mando o usuário para o perfil dele, assim ele vê quantas fotos tem e 'apago' o histórico para que ele não consiga voltar para a foto que foi apagada
      // O redirect é usado fora do componente, dentro da configuração da rota. Ele acontece antes da página começar a ser montada ou renderizada. Onde usar: Em beforeLoad, loaders ou funções de busca de dados.
      // O navigate é usado dentro do componente ou em callbacks de eventos (como o seu onSuccess do TanStack Query). Ele acontece depois que o usuário já está "dentro" do ciclo de vida do React. Onde usar: Dentro de useEffect, funções de clique (onClick) ou após mutações de dados.
      navigate({
        to: "/profile",
        replace: true, // Substitui no histórico para o usuário não ficar preso no "voltar"
      });
    },
    onError: (_error) => {
      // Use o onError para EFEITOS (Toasts, logs externos, etc)
      // Não dê 'throw' aqui.
      toast.error("Não foi possível apagar a foto.");
    },
  });
};
