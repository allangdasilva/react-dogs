import { useAuthStore } from "../features/auth/store/auth.store";
import { api } from "./axios";
import type { AxiosError } from "axios";

// ---- interceptors.request ----
// injeta token automaticamente
// você nunca precisa passar token manualmente

// Por que usar interceptors?
// Para não ter que repetir "headers: { Authorization: ... }" em cada GET ou POST.
// api.interceptors.request.use registra um comportamento dentro da instância api.
// TODAS as requisições passam por esse interceptor
// O config é um objeto de configuração que o Axios cria contendo todos os detalhes daquela requisição específica que está prestes a acontecer. Ele contém informações como:
// URL: Para onde a requisição está indo.
// Method: Se é um GET, POST, etc.
// Headers: Os cabeçalhos.
// Data: O corpo da mensagem.
// Params: Os filtros da URL.
api.interceptors.request.use((config) => {
  // Usamos .getState() em vez de chamar como hook.
  // Isso lê o valor atual do Zustand sem precisar estar dentro de um componente
  const { token } = useAuthStore.getState();

  if (token) {
    // Antes de qualquer requisição sair (ser concluída), pega o token (se existir) e coloca no header da requisição.
    config.headers.Authorization = `Bearer ${token}`;
  }

  // É vital retornar o config, ou a requisição fica "presa"
  return config;
});

// Quando fizer: api.get("/api/user");
// 1. Axios cria a requisição
// 2. Esse Interceptor roda
// 3. Ele pega o token do Zustand
// 4. Adiciona no header
// 5. Dai a requisição é enviada
// obs: para executar esse interceptor basta chamá-lo no inicio do app (main.tsx)
// ele é executado no momento do import

// Esse código cria um "pedágio automático" para todas as suas chamadas de API: toda vez que você faz uma requisição (como um api.get), o Axios a interrompe por um milésimo de segundo para verificar no seu "cofre" (o Zustand, via getState()) se existe um token de login salvo; se houver, ele "carimba" automaticamente o cabeçalho da requisição com esse token (Authorization: Bearer ...), permitindo que o servidor te identifique sem que você precise escrever esse código repetidamente em cada tela do sistema.

// ---- interceptors.response ----
// interceptor de resposta no Axios. Ou seja, tudo que voltar da API passa aqui.
// E roda em toda resposta
// Esse interceptor resolve um problema global: você não precisa tratar “token expirado” em cada tela
api.interceptors.response.use(
  // Esse é o caso de sucesso (status 200, 201, etc).
  // res = resposta completa do Axios, contém data, status e headers.
  // Aqui só está passando ela pra frente (sem mexer)
  (res) => res,
  // Esse é o caso de erro
  // error = É um objeto do Axios chamado AxiosError
  (error: AxiosError) => {
    // Aqui está dizendo: "Se a API respondeu que não está autorizado"
    // HTTP status code: 401 = Unauthorized
    if (error.response?.status === 401) {
      // Ação direta: desloga usuário / limpa token
      useAuthStore.getState().logout();
    }
    // Repassa o erro pra quem chamou a requisição.
    // Rejeita a promessa para que o erro ainda possa ser tratado localmente (ex: no React Query).
    return Promise.reject(error);
  },
);

// API falha
// 1. interceptor roda
// 2. logout (se 401)
// 3. React Query / useMutation recebe o erro

// Este interceptor funciona como um "vigia de retorno" que monitora todas as respostas da API em tempo real: se o servidor enviar um erro 401 (Não Autorizado), ele entende imediatamente que sua sessão expirou e executa o logout() de forma global, garantindo que o usuário seja desconectado e o sistema permaneça seguro, sem que você precise tratar essa expiração manualmente em cada tela ou componente do app.

// ---- resumo de ambos ----
// Juntos, esses dois interceptores criam um fluxo automatizado de autenticação, onde o primeiro garante que todas as suas chamadas saiam identificadas com o token atualizado e o segundo monitora se o servidor ainda aceita essa credencial, permitindo que sua aplicação gerencie logins e expirações de forma invisível e centralizada, economizando centenas de linhas de código repetitivo e evitando falhas de segurança.
