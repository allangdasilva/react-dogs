import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { handleApiError } from "./functions/handleApiError";
import { api } from "../../../api/axios";
import {
  passwordLostResponseSchema,
  type PasswordLostResponseSchema,
} from "../types/passwordLostResponse";
import type { UseFormReset } from "react-hook-form";

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
