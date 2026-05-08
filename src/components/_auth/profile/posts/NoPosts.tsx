import { Link } from "@tanstack/react-router";
import BoneIcon from "../../../svgs/BoneIcon";
import TitleSm from "../../../common/TitleSm";

const NoPosts = () => {
  return (
    <section className="flex flex-col gap-6 items-center text-center text-base-700 animate-content-in">
      <BoneIcon />
      <TitleSm>Postar fotos</TitleSm>
      <p>Quando você postar fotos, elas aparecerão aqui.</p>
      <Link
        to="/profile/create"
        className="font-body-sm link-sm-underline-blue"
      >
        Poste sua primeira foto!
      </Link>
    </section>
  );
};

export default NoPosts;
