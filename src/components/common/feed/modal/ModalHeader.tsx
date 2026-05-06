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

  // Lógica extraída para variáveis
  // É o dono da foto?
  const isAuthor = user?.username === photo.author;
  // deve mostrar as visualizações? se isPhotoPage for true, mostra, se não é o dono da foto, mostra também
  const shouldShowViews = isPhotoPage || !isAuthor;

  return (
    <header
      className={clsx(
        "p-3 flex justify-between items-center gap-1 bg-base-100",
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
        {/* se isPhotoPage for true (é a página única) OU se o usuário não é o dono da foto (isso conta para o usuário deslogado obviamente), então mostra as visualizações. mas tenha em mente, PODE ser photoPage e o usuário estar logado, que também vai aparecer (por isso do || 'OU')  */}
        {shouldShowViews ? (
          <div className="flex items-center gap-1">
            <EyeIcon />
            <span className="font-body-xs text-base-500">{photo.acessos}</span>
          </div>
        ) : (
          // é photoPage, mas é o usuário? então mostra: visualização + lixeira (ou seja, esse span aqui debaixo nem vai ser usado, ele só é usado no modal)
          // não é photoPage e nem é o usuário? então mostra: link + visualização (nem mostra esse span abaixo, pois shouldShowViews é true (por causa do !isAuthor))
          // não é photoPage, mas é o usuário, daí sim mostra esse span (que é o único momento que ele aparece, que é no modal)
          <span className="font-body-base font-semibold text-base-700">
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
      className="link-sm-underline-blue wrap-break-word min-w-0"
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
