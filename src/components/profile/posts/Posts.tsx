import { Link } from "@tanstack/react-router";
import BoneIcon from "../../svgs/BoneIcon";

const Posts = () => {
  return (
    <div className="max-w-base px-4 py-12 flex flex-col gap-6 items-center text-center text-base-700">
      <BoneIcon />
      <h3 className="font-title-sm">Postar fotos</h3>
      <p>Quando você postar fotos, elas aparecerão aqui.</p>
      <Link to="/profile/create" className="link-sm-underline-blue">
        Poste sua primeira foto!
      </Link>
    </div>
  );
};

export default Posts;
