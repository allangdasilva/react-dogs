import { isAxiosError } from "axios";

// O tipo : never no TypeScript é usado para indicar valores que nunca ocorrem ou funções que nunca retornam. Ele difere do void (que retorna undefined ou null) por garantir que o código após a função seja inacessível. Principais cenários de uso:
// Funções que Lançam Erros: Quando uma função sempre encerra a execução com um erro.
// Loops Infinitos: Funções que rodam indefinidamente.
export const handleApiError = (
  error: unknown,
  defautMessage: string,
  alwaysUseDefault?: boolean,
): never => {
  if (isAxiosError(error)) {
    // CASO A: O servidor respondeu com um erro (4xx, 5xx)
    if (error.response) {
      const apiMessage = error.response.data?.message;
      throw new Error(
        alwaysUseDefault ? defautMessage : apiMessage || defautMessage,
      );
    }
    // CASO B: A requisição foi feita mas não houve resposta (Rede/CORS/Offline)
    if (error.request) {
      throw new Error(
        "Servidor fora do ar ou erro de conexão. Verifique sua internet.",
      );
    }
  }
  // CASO C: Erro catastrófico ou de lógica no JS
  throw new Error("Ocorreu um erro inesperado. Tente novamente mais tarde.");
};
