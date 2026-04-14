import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import EyeIcon from "../../svgs/EyeIcon";
import PageTitle from "../../PageTitle";
import Spacer from "../../Spacer";
import Form from "../../form/Form";
import TextareaField from "../../form/TextareaField";
import ButtonSubmit from "../../form/ButtonSubmit";
import CommentIcon from "../../svgs/CommentIcon";
import CloseIcon from "../../svgs/CloseIcon";
import ModalDescription from "./ModalDescription";
import type { PhotoSchema } from "../../../features/auth/types/photos.schema";
import FeedPhoto from "../FeedPhoto";
import { useAuthStore } from "../../../features/auth/store/auth.store";
import { userQueryOptions } from "../../../features/auth/api/queries/user.query,";

type Props = {
  photo: PhotoSchema;
};

const Modal = ({ photo, ...props }: Props) => {
  const token = useAuthStore((s) => s.token);

  const { data: user } = useQuery(userQueryOptions(token));

  return (
    <Dialog.Root {...props}>
      <Dialog.Trigger className="outline-none">
        <FeedPhoto photo={photo} />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-base-700/40 z-50" />

        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-1/2 w-4/5 h-4/5 max-w-255 max-h-170 flex flex-col overflow-auto rounded-base shadow-lg z-60 md:grid md:grid-cols-3 md:grid-rows-1 will-change-auto data-[state=open]:animate-modal-in">
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
            <header className="p-3 flex justify-between items-center bg-base-100">
              <Link
                className="text-link hover:underline focus:underline"
                to="/"
              >
                @{photo.author}
              </Link>
              <span className="flex items-center gap-1">
                <EyeIcon />
                <span className="font-body-xs text-base-500">
                  {photo.acessos}
                </span>
              </span>
            </header>

            {/* Título, Descrição e Comentários*/}
            <div className="p-3 h-full overflow-y-scroll scroll-w- bg-base-000">
              {/* Título */}
              <Dialog.Title asChild>
                <PageTitle>{photo.title}</PageTitle>
              </Dialog.Title>

              {/* Semanticamente, um Dialog deve ter apenas uma descrição (ou nenhuma). O Radix associa o ID da descrição ao atributo aria-describedby do modal. Se você usa várias vezes, os leitores de tela podem se confundir ou ler apenas a última. Use Dialog.Description apenas para uma breve explicação do que é o modal (pode usa-la  assim: descrição invisível e acessivel) e use tags HTML normais (p, span, header) para o restante do conteúdo. */}
              <Dialog.Description className="sr-only">
                Detalhes e comentários sobre a foto de {photo.title}
              </Dialog.Description>

              {/* Descrição */}
              <div className="flex flex-col">
                <ModalDescription
                  descriptionValue={photo.peso}
                  ageOrWeigth="weight"
                >
                  Peso:
                </ModalDescription>
                <ModalDescription
                  descriptionValue={photo.idade}
                  ageOrWeigth="age"
                >
                  Idade:
                </ModalDescription>
              </div>

              <Spacer className="mt-2 bg-base-200" />

              {/* Comentários */}
              <ul className="mt-2">
                <li>
                  <p className="font-body-sm text-base-700">
                    <span className="font-semibold">User: </span>
                    Comentário
                  </p>
                </li>
              </ul>
            </div>

            {/* Formulário de comentar */}
            {user && (
              <section className="p-3 bg-base-100">
                <Form className="flex-row gap-2!">
                  <TextareaField
                    id="comment"
                    placeholder="Comente..."
                    rows={1}
                  />
                  <ButtonSubmit className="py-2 px-4 max-w-fit">
                    <CommentIcon />
                  </ButtonSubmit>
                </Form>
              </section>
            )}
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
