import { Link } from "@tanstack/react-router";
import EyeIcon from "../../svgs/EyeIcon";
import type { PhotoSchema } from "../../../features/auth/types/photos.schema";

type Props = React.HTMLAttributes<HTMLElement> & {
  photo: PhotoSchema;
};

const ModalHeader = ({ photo }: Props) => {
  return (
    <header className="p-3 flex justify-between items-center bg-base-100">
      <Link className="link-sm-underline-blue" to="/">
        @{photo.author}
      </Link>
      <span className="flex items-center gap-1">
        <EyeIcon />
        <span className="font-body-xs text-base-500">{photo.acessos}</span>
      </span>
    </header>
  );
};

export default ModalHeader;
