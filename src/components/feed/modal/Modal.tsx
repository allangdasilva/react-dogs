import * as Dialog from "@radix-ui/react-dialog";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import PageTitle from "../../PageTitle";
import Spacer from "../../Spacer";
import CloseIcon from "../../svgs/CloseIcon";
import ModalDescription from "./ModalDescription";
import type { PhotoSchema } from "../../../features/auth/types/photos.schema";
import FeedPhoto from "../FeedPhoto";
import ModalFormComment from "./ModalFormComment";
import ModalHeader from "./ModalHeader";
import ModalComments from "./ModalComments";
import ErrorFallback from "../../helper/ErrorFallback";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

type Props = {
  photo: PhotoSchema;
};

const Modal = ({ photo }: Props) => {
  // Este hook é o "controle remoto" do cache de erros do TanStack
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Dialog.Root>
      <Dialog.Trigger className="outline-none cursor-pointer group">
        <FeedPhoto photo={photo} />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-base-700/40 z-50" />

        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-1/2 w-4/5 h-4/5 max-w-255 max-h-170 flex flex-col overflow-auto rounded-base shadow-lg z-60 scrollbar-none md:grid md:grid-cols-3 md:grid-rows-1 will-change-auto data-[state=open]:animate-modal-in">
          {/* Imagem */}
          <div className="max-h-4/5 md:max-h-none md:col-span-2 bg-black">
            <img
              className="w-full h-full object-contain"
              src={photo.src}
              alt={photo.title}
            />
          </div>

          {/* Conteúdo */}
          <div className="flex flex-col bg-base-000">
            {/* Link do perfil e Visualizações */}
            <ModalHeader photo={photo} />

            {/* Título, Descrição e Comentários*/}
            <div className="p-3 h-full overflow-y-scroll scrollbar-none bg-base-000">
              {/* Título */}
              <Dialog.Title className="sr-only">{photo.title}</Dialog.Title>
              <PageTitle>{photo.title}</PageTitle>

              {/* Semanticamente, um Dialog deve ter apenas uma descrição (ou nenhuma). O Radix associa o ID da descrição ao atributo aria-describedby do modal. Se você usa várias vezes, os leitores de tela podem se confundir ou ler apenas a última. Use Dialog.Description apenas para uma breve explicação do que é o modal (pode usa-la  assim: descrição invisível e acessivel) e use tags HTML normais (p, span, header) para o restante do conteúdo. */}
              <Dialog.Description className="sr-only">
                Detalhes e comentários sobre a foto de {photo.title}
              </Dialog.Description>

              {/* Descrição */}
              <ModalDescription photo={photo} />

              <Spacer className="mt-2 bg-base-200" />

              {/* Comentários */}
              {/* O Suspense permite que você "delegue" o estado de loading para um pai. Quando o useSuspenseQuery é chamado, ele "suspende" o componente e mostra o fallback mais próximo. */}
              <Suspense fallback={<p>Carregando...</p>}>
                {/* Quando você usa useQuery (normal), o erro fica guardado no objeto { error }. O React não trava.
                Quando você usa useSuspenseQuery, o TanStack Query lança (throw) o erro para cima. Se não houver um ErrorBoundary em volta, o seu app inteiro "quebra" (fica com a tela branca ou mostra o erro padrão do navegador). */}
                {/* Diferença entre erros do ErrorBoundary vs. useMutation:

                Erros no useSuspenseQuery (ErrorBoundary): Erro de Leitura/Renderização. Sem os dados, o componente não existe. Impede o componente de ser exibido.

                Erros no useMutation (try/catch ou state): Erro de Ação do Usuário. O componente existe, mas a ação falhou. O componente continua na tela; apenas exibe um alerta.
                 */}
                {/* Ou seja,Você não quer que o app inteiro morra se apenas a seção de comentários falhar. */}
                {/* Use useSuspenseQuery + ErrorBoundary quando: O dado é obrigatório para a visualização daquela parte da tela. Você quer um código mais limpo, sem if (isLoading) espalhados. */}
                {/* onReset (mais detalhes em ErrorFallback.tsx): O TanStack Query fornece um hook especial chamado useQueryErrorResetBoundary(). Ele serve justamente para avisar ao cache: "Apague a memória de que esta query deu erro". */}
                <ErrorBoundary
                  FallbackComponent={ErrorFallback}
                  // Quando o resetErrorBoundary (lá do botão) é chamado,
                  // o ErrorBoundary executa esta função onReset primeiro.
                  onReset={() => {
                    reset(); // Isso limpa o "status de erro" das queries dentro deste boundary
                  }}
                >
                  <ModalComments photo_id={photo.id} />
                </ErrorBoundary>
              </Suspense>
            </div>

            {/* Formulário de comentar */}
            <ModalFormComment photo_id={photo.id} />
          </div>

          <Dialog.Close className="absolute top-3 left-3 rounded-full p-0.5 cursor-pointer bg-base-100/50 hover:bg-base-100 focus:bg-base-100 transition-colors ease-in">
            <CloseIcon />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
