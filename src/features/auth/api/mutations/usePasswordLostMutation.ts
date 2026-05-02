import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { UseFormReset } from "react-hook-form";
import { api } from "../../../../api/axios";
import { handleApiError } from "../functions/handleApiError";
import {
  passwordLostResponseSchema,
  type PasswordLostResponseSchema,
} from "../../types/password/lost/passwordLostResponse.schema";

type MutateProps = {
  login: string;
  url: string;
};

export const usePasswordLostMutation = (
  reset: UseFormReset<{
    login: string;
  }>,
) => {
  return useMutation({
    mutationFn: async (credentials: MutateProps) => {
      try {
        const response = await api.post<PasswordLostResponseSchema>(
          "/api/password/lost",
          credentials,
        );

        const data = passwordLostResponseSchema.parse(response.data);

        return data;
      } catch (error) {
        handleApiError(error, "Erro ao buscar usuário.");
      }
    },
    onSuccess: () => {
      toast.success("Link de recuperação enviado!");
      reset();
    },
  });
};
