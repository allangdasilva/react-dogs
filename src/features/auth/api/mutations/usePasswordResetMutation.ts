import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";
import { api } from "../../../../api/axios";
import { handleApiError } from "../functions/handleApiError";
import {
  passwordResetResponseSchema,
  type PasswordResetResponseSchema,
} from "../../types/password/reset/passwordResetResponse.schema";

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
      // manda o usuário para /login, pois o link agora é inválido e ele só irá receber erro se ficar tentando alterar a senha diversas vezes
      navigate({ to: "/login" });
    },
  });
};
