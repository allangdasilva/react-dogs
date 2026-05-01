import { useMutation } from "@tanstack/react-query";
import { handleApiError } from "./functions/handleApiError";
import { api } from "../../../api/axios";
import toast from "react-hot-toast";
import {
  passwordResetResponseSchema,
  type PasswordResetResponseSchema,
} from "../types/passwordResetResponse";
import { useNavigate } from "@tanstack/react-router";

type MutateProps = {
  login: string;
  key: string;
  password: string;
};

export const usePasswordResetMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: MutateProps) => {
      try {
        const response = await api.post<PasswordResetResponseSchema>(
          "/api/password/reset",
          credentials,
        );

        return passwordResetResponseSchema.parse(response.data);
      } catch (error) {
        handleApiError(
          error,
          "Link de recuperação expirado ou inválido.",
          true,
        );
      }
    },
    onSuccess: () => {
      toast.success("Senha alterada com sucesso!");
      navigate({ to: "/login" });
    },
  });
};
