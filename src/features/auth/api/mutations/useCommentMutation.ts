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
    onSuccess: async (_data, variables) => {
      // variables: pega os argumentos da mutation para conseguir invalidar especificamente a foto que recebeu o comentário
      await queryClient.invalidateQueries({
        queryKey: ["photo", variables.id],
      });
      // limpa os campos do formulário
      reset();
    },
  });
};
