import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { api } from "../../../api/axios";
import { useLoginMutation } from "./useLoginMutation";
import { type SignupFormSchema } from "../types/signupForm.schema";
import {
  signupResponseSchema,
  type SignupResponseSchema,
} from "../types/signupResponse";
import { handleApiError } from "./functions/handleApiError";

export const useSigupMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // o mutateAsync é necessário para usar o await. Pois você quer garantir que o login seja concluído antes de qualquer coisa
  const { mutateAsync: loginMutation } = useLoginMutation({ redirectTo: "/" });

  return useMutation({
    mutationFn: async (credentials: SignupFormSchema) => {
      try {
        const response = await api.post<SignupResponseSchema>(
          "/api/user",
          credentials,
        );

        return signupResponseSchema.parse(response.data);
      } catch (error: unknown) {
        handleApiError(error, "Já existe um usuário com esses dados.");
      }
    },
    // _data É uma convenção de JavaScript/TypeScript para indicar que aquele parâmetro é ignorado, mas você precisa declará-lo para chegar ao segundo argumento
    onSuccess: async (_data, credentials) => {
      // queryClient.clear() usar independentemente de o auto-login funcionar ou não, pois o cadastro em si já foi um sucesso e você quer limpar qualquer lixo de cache anterior.
      queryClient.clear();
      try {
        await loginMutation({
          username: credentials.username,
          password: credentials.password,
        });
      } catch (error) {
        // Se o cadastro funcionou, mas o login automático falhou. O melhor é mandá-lo para a página de login com uma mensagem.
        console.error("Cadastro ok, mas falha no auto-login", error);
        navigate({ to: "/login" });
      }
    },
  });
};
