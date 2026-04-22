import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import EyeIcon from "../../svgs/EyeIcon";
import type { PhotoSchema } from "../../../features/auth/types/photos.schema";
import { userQueryOptions } from "../../../features/auth/api/queries/user.query";
import { useAuthStore } from "../../../features/auth/store/auth.store";
import ConfirmDialog from "../../helper/ConfirmDialog";

type Props = React.HTMLAttributes<HTMLElement> & {
  photo: PhotoSchema;
};

const ModalHeader = ({ photo }: Props) => {
  const token = useAuthStore((s) => s.token);
  const { data: user } = useQuery(userQueryOptions(token));

  return (
    <header
      className={clsx("p-3 flex justify-between items-center bg-base-100", {
        "flex-row-reverse": user && user.username === photo.author,
      })}
    >
      {user && user.username === photo.author ? (
        <ConfirmDialog photo_id={photo.id} />
      ) : (
        <Link className="link-sm-underline-blue" to="/">
          @{photo.author}
        </Link>
      )}

      <span className="flex items-center gap-1">
        <EyeIcon />
        <span className="font-body-xs text-base-500">{photo.acessos}</span>
      </span>
    </header>
  );
};

export default ModalHeader;
