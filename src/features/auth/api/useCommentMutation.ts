import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleApiError } from "./functions/handleApiError";
import { api } from "../../../api/axios";
import type { CommentFormSchema } from "../types/commentForm";
import { type CommentResponseSchema } from "../types/commentResponse";
import type { UseFormReset } from "react-hook-form";

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
      reset();
    },
  });
};
