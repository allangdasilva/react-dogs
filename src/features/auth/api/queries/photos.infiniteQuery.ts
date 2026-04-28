import { infiniteQueryOptions } from "@tanstack/react-query";
import { fetchPhotos } from "../functions/get-photos";

// useInfiniteQuery é o hook do React Query usado para listas paginadas que crescem aos poucos.
// Ele guarda várias páginas no cache, te dá controle para buscar a próxima página (fetchNextPage) e te informa se ainda existe mais conteúdo (hasNextPage). É a escolha certa para feed, timeline, comentários longos e qualquer lista que carregue “mais itens” ao rolar.

const PAGE_SIZE = 6;

export const photosInfiniteQueryOptions = (userId: number | string) => {
  return infiniteQueryOptions({
    // IDENTIFICADOR ÚNICO: Como uma "etiqueta" no armário (cache).
    // Se os parâmetros mudarem (ex: outro usuário), ele cria uma gaveta nova.
    // Se o userId mudar, o cache muda também
    queryKey: ["photos", userId],

    // initialPageParam é o primeiro "pageParam" da lista infinita.
    // O React Query usa isso para saber por onde começar.
    // famoso "página 1"
    initialPageParam: 1,

    // queryFn recebe o pageParam atual:
    // queryFn recebe pageParam na primeira chamada, pageParam vem de initialPageParam
    // nas próximas chamadas, pageParam vem do valor retornado por getNextPageParam
    queryFn: ({ pageParam }) => fetchPhotos(pageParam, PAGE_SIZE, userId),

    // getNextPageParam decide se existe próxima página.
    // Se retornar undefined/null, o React Query entende que acabou.
    // Aqui eu estou inferindo pelo tamanho da página:
    // se vier menos itens que PAGE_SIZE, não existe próxima página.
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length + 1;
    },

    // staleTime: Economiza muita banda e bateria do celular, já que o feed não fica "recarregando" toda hora que o usuário muda de aba. Para feeds em tempo real, costuma-se usar um staleTime de 30 segundos ou 1 minuto.
    // VALIDADE DO DADO (STALE TIME): Define por quanto tempo o dado é considerado "fresco".
    // BENEFÍCIO: Durante 5 min, se o usuário navegar entre abas e voltar, a tela
    // carrega INSTANTANEAMENTE sem nenhuma nova requisição ao servidor.
    staleTime: 1000 * 60 * 5,

    // retry e retryDelay: Essencial em feeds, o usuário geralmente está no 4G/5G em movimento. Oscilações são comuns. Tentar 3 vezes com intervalos crescentes é a melhor prática para evitar que a tela de "Erro" apareça por bobeira.
    // RESILIÊNCIA (RETRY): Se a internet oscilar e a busca falhar, ele não desiste de primeira.
    // BENEFÍCIO: Recupera erros temporários de conexão sem que o usuário precise atualizar a página manualmente.
    retry: 3,
    // RETRY DELAY: Estratégia de "Exponential Backoff". Espera 1s, depois 2s, depois 4s...
    // BENEFÍCIO: Se o servidor estiver sobrecarregado, esperar um pouco mais a cada tentativa. Evita derrubar o sistema de vez e aumenta a chance de sucesso na próxima tentativa.
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),

    // gcTime: Como feeds carregam MUITAS imagens e dados, limpar a memória após 30 minutos de inatividade evita que a aba do navegador fique pesada e lenta (o famoso "vazamento de memória").
    // FAXINA (GC TIME): Tempo para manter o dado no cache após o componente ser destruído.
    // BENEFÍCIO: Mantém a memória do navegador leve. Se o usuário não acessar essas fotos por 30 min, o TanStack Query "joga o lixo fora" automaticamente.
    gcTime: 1000 * 60 * 30,
  });
};
