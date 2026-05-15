import * as Dialog from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { useAuthStore } from "../../../../features/auth/store/auth.store";
import { userQueryOptions } from "../../../../features/auth/api/queries/user.query";
import ConfirmDialog from "../../../_auth/photo-delete/ConfirmDialog";
import EyeIcon from "../../../svgs/EyeIcon";
import type { PhotoResponseSchema } from "../../../../features/auth/types/photosResponse.schema";

type Props = React.HTMLAttributes<HTMLElement> & {
  photo: PhotoResponseSchema;
  isPhotoPage?: boolean;
};

const ModalHeader = ({ photo, isPhotoPage = false }: Props) => {
  const token = useAuthStore((s) => s.token);
  const { data: user } = useQuery(userQueryOptions(token));

  // formartando número de acessos
  // Esta é a API nativa mais eficiente e segura para formatação regional.
  // pt-BR garante o uso do ponto como separador de milhar.
  const views = photo.acessos;
  const formatter = new Intl.NumberFormat("pt-BR");

  // Lógica extraída para variáveis
  // É o dono da foto?
  const isAuthor = user?.username === photo.author;
  // deve mostrar as visualizações? se isPhotoPage for true, mostra, se não é o dono da foto, mostra também
  const shouldShowViews = isPhotoPage || !isAuthor;

  return (
    <header
      className={clsx(
        "p-3 flex justify-between items-center gap-1 border-b border-neutral-dogs-200 bg-neutral-dogs-100",
        { "flex-row-reverse": isAuthor }, // se o dono da foto (logado obviamente) é quem está vendo a foto, então inverte os lados do flex
      )}
    >
      <div className="flex items-center">
        {/* se o dono da foto (logado obviamente) é quem está vendo a foto, mostre a lixeira (botão que a abre o dialog de confirmação) */}
        {isAuthor ? (
          <ConfirmDialog photo_id={photo.id} />
        ) : (
          // se não, mostre o link do dono da foto (que não é o usuário logado, ex: @nomedeoutrousuário)
          <NavigationLink
            author={photo.author}
            shouldCloseModal={!isPhotoPage}
          />
        )}
      </div>

      <div className="flex items-center">
        {!isPhotoPage && !isAuthor ? null : shouldShowViews ? (
          <div className="flex items-center gap-1">
            <EyeIcon />
            <span className="font-body-primary text-neutral-dogs-900/40">
              {formatter.format(views)}
            </span>
          </div>
        ) : (
          <span className="font-body-primary font-semibold text-neutral-dogs-900/90">
            @{photo.author}
          </span>
        )}
      </div>
    </header>
  );
};

export default ModalHeader;

// --- Sub-componentes para limpeza visual ---

function NavigationLink({
  author,
  shouldCloseModal,
}: {
  author: string;
  shouldCloseModal: boolean;
}) {
  const content = (
    <Link
      className="font-body-primary link-underline-blue wrap-break-word min-w-0"
      to="/$profileId"
      params={{ profileId: author }}
    >
      @{author}
    </Link>
  );

  // Só envolve no Dialog.Close se necessário
  if (shouldCloseModal) {
    return <Dialog.Close asChild>{content}</Dialog.Close>;
  }

  return content;
}
