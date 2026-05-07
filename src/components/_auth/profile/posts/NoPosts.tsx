import { Link } from "@tanstack/react-router";
import BoneIcon from "../../../svgs/BoneIcon";
import TitleSm from "../../../common/TitleSm";

const NoPosts = () => {
  return (
    <div className="flex flex-col gap-6 items-center text-center text-base-700">
      <BoneIcon />
      <TitleSm>Postar fotos</TitleSm>
      <p>Quando você postar fotos, elas aparecerão aqui.</p>
      <Link
        to="/profile/create"
        className="font-body-sm link-sm-underline-blue"
      >
        Poste sua primeira foto!
      </Link>
    </div>
  );
};

export default NoPosts;
