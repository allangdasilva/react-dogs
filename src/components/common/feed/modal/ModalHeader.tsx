import * as Dialog from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { useAuthStore } from "../../../../features/auth/store/auth.store";
import { userQueryOptions } from "../../../../features/auth/api/queries/user.query";
import ConfirmDialog from "../../../_auth/ConfirmDialog";
import EyeIcon from "../../../svgs/EyeIcon";
import type { PhotoResponseSchema } from "../../../../features/auth/types/photosResponse.schema";

type Props = React.HTMLAttributes<HTMLElement> & {
  photo: PhotoResponseSchema;
};

const ModalHeader = ({ photo }: Props) => {
  const token = useAuthStore((s) => s.token);
  const { data: user } = useQuery(userQueryOptions(token));

  return (
    <header
      className={clsx(
        "p-3 flex justify-between items-center gap-1 bg-base-100",
        {
          "flex-row-reverse": user && user.username === photo.author,
        },
      )}
    >
      {user && user.username === photo.author ? (
        <ConfirmDialog photo_id={photo.id} />
      ) : (
        <Dialog.Close asChild>
          <Link
            className="link-sm-underline-blue wrap-break-word min-w-0"
            to="/$profileId"
            params={{ profileId: photo.author }}
          >
            @{photo.author}
          </Link>
        </Dialog.Close>
      )}

      <span className="flex items-center gap-1">
        <EyeIcon />
        <span className="font-body-xs text-base-500">{photo.acessos}</span>
      </span>
    </header>
  );
};

export default ModalHeader;
