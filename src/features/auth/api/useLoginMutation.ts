import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { api } from "../../../api/axios";
import type { LoginFormSchema } from "../types/loginForm.schema";
import {
  loginResponseSchema,
  type LoginResponseSchema,
} from "../types/loginResponse.schema";
import axios from "axios";
import { useAuthStore } from "../store/auth.store";
import { fetchCurrentUser } from "./get-user";
import { Route } from "../../../routes/_public/login";

export const useLoginMutation = () => {
  // aqui podemos usar o hook useAuthStore normalmente. pois hooks funcionam
  // em componentes React e dentro ou outros hooks
  const setToken = useAuthStore((state) => state.setToken);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // Pegamos os parâmetros da URL de login
  const search = Route.useSearch();

  return useMutation({
    mutationFn: async (credentials: LoginFormSchema) => {
      try {
        // Quando você passa um objeto JavaScript no segundo parâmetro do api.post, o Axios identifica que aquilo é um objeto e, por padrão, já configura o Header Content-Type como application/json e transforma seu objeto em uma string JSON (JSON.stringify). Se precisasse mudar, pode passar um terceiro parâmetro
        // Axios permite que você defina uma Interface para o que espera receber no data. Passamos o tipo entre < > para o Axios
        // Quando api.post<LoginResponseSchema>(...), você está dizendo ao TypeScript: "Confie em mim, o que vier no response.data terá esse formato".
        // Porém, isso é apenas uma "promessa" em tempo de compilação e não em tempo de execução. Se a API mudar, o TypeScript não saberá. Por isso usamos o parse logo abaixo para garantir que a promessa/tipagem foi cumprida
        const response = await api.post<LoginResponseSchema>(
          "/jwt-auth/v1/token",
          credentials,
        );

        // A palavra Parse em programação significa "analisar e converter". No caso do Zod, ele analisa um dado "desconhecido" e verifica se ele segue as regras do seu Schema.
        // Ele tenta validar. Se os dados estiverem certos, ele retorna os dados tipados.
        // Se estiverem errados, ele lança um erro (throw). Isso trava a execução daquela função (mutationFn) e joga o erro direto para o onError do seu useMutation.
        const token = loginResponseSchema.parse(response.data).token;

        // O endpoint de validate fica inútil nesse caso, pq ao fazer o login eu já tenho um token novo, ou seja, é válido, então eu retorno ele e pego ele no onSucess e faço o setToken no zustand, dai em diante meu beforeLoad no root/qualquer outra requisição passará o token graças ao inteceptor do axios
        return token;
      } catch (error: unknown) {
        // O Axios coloca a resposta do servidor dentro de error.response
        // Aqui verificamos se o error é uma instância de AxiosError, assim fica mais seguro para fazer a verificação do status da resposta
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          // Se o axios tentou fazer a requisição acima e não obteve sucesso, então cai aqui no bloco de catch, que faz  o seguinte "se o erro for 403 ou 401 (erros de usuário não autorizado), devolve a seguinte mensagem "Usuário ou senha inválidos." para o {erro} do hook useLoginMutation lá no seu componente"
          if (status === 403 || status === 401) {
            throw new Error("Usuário ou senha inválidos.");
          }
        }
        // Caso seja outro erro (ex: rede fora do ar), então devolve a seguinte mensagem "Ocorreu um erro ao tentar entrar. Tente novamente mais tarde."
        throw new Error(
          "Ocorreu um erro ao tentar entrar. Tente novamente mais tarde.",
        );
      }
    },
    onSuccess: async (token) => {
      // 1. Atualiza o estado global primeiro.
      // O interceptor agora já tem acesso ao novo token para as próximas chamadas.
      setToken(token);

      // 2. Limpa o cache de forma abrangente.
      // Como o usuário mudou, não queremos que sobrem fotos ou dados do usuário anterior.
      // O invalidate sem chaves limpa TUDO, pode passar { queryKey: ['user'] } se preferir.
      // Se houver algum componente na tela usando aquele dado, ele dispara um refetch (busca novamente) na hora para atualizar a interface.
      // o invalidateQueries não precisa necessariamente de um await, pois ele apenas "troca uma etiqueta"/informa que os dados estão stale/velho no cache.
      queryClient.invalidateQueries();

      // 3. Busca Antecipada (Prefetching):
      // Em vez de esperar o componente da próxima tela montar e mostrar um "Carregando...",
      // nós já puxamos os dados agora. O queryClient guarda no cache e o useQuery['user'] da próxima tela lerá instantaneamente de lá.
      // O await no fetchQuery garante que a mutação (mutationFn/onSuccess) só termine quando os dados do usuário estiverem salvos.
      await queryClient.fetchQuery({
        queryKey: ["user"],
        queryFn: fetchCurrentUser,
      });

      // Lógica de Redirecionamento:
      // Se houver algo no search.redirect, vai pra lá. Senão, vai pra "/"
      const destination = search.redirect || "/";

      navigate({ to: destination });
    },
  });
};
