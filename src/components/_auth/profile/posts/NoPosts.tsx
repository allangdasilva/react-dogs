import { Link } from "@tanstack/react-router";
import BoneIcon from "../../../svgs/BoneIcon";
import Heading2 from "../../../common/Heading2";

const NoPosts = () => {
  return (
    <section className="flex flex-col gap-6 items-center text-center text-neutral-dogs-900 animate-content-in">
      <BoneIcon />
      <Heading2>Postar fotos</Heading2>
      <p className="font-body-primary text-neutral-dogs-900/90">
        Quando você postar fotos, elas aparecerão aqui.
      </p>
      <Link
        to="/profile/create"
        className="font-body-primary link-underline-blue"
      >
        Poste sua primeira foto!
      </Link>
    </section>
  );
};

export default NoPosts;
