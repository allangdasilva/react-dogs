import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseFormReset } from "react-hook-form";
import { api } from "../../../../api/axios";
import { handleApiError } from "../functions/handleApiError";
import type { CommentFormSchema } from "../../types/comment/commentForm.schema";
import type { CommentResponseSchema } from "../../types/comment/commentResponse.schema";

type MutateProps = {
  id: number;
  data: CommentFormSchema;
};

export const useCommentMutation = (
  reset: UseFormReset<{
    comment: string;
  }>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: MutateProps) => {
      try {
        const response = await api.post<CommentResponseSchema>(
          `/api/comment/${id}`,
          data,
        );

        return response.data;
      } catch (error: unknown) {
        handleApiError(error, "Erro ao fazer comentário.");
      }
    },
    onSuccess: (_data, variables) => {
      // variables: pega os argumentos da mutation para conseguir invalidar especificamente a foto que recebeu o comentário

      // Aqui, o mais importante é "limpar a tela" para o usuário sentir que o comentário foi enviado.
      // Sem await resetamos o campo de texto IMEDIATAMENTE.
      // Enquanto o usuário vê o campo limpo, o cache da foto específica
      // é atualizado em background para mostrar o novo comentário na lista.
      queryClient.invalidateQueries({
        queryKey: ["photo", variables.id],
      });
      reset();
    },
  });
};
