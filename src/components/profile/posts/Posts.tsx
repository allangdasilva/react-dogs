import { Link } from "@tanstack/react-router";
import BoneIcon from "../../svgs/BoneIcon";
import SmTitle from "../../SmTitle";

const Posts = () => {
  return (
    <div className="flex flex-col gap-6 items-center text-center text-base-700">
      <BoneIcon />
      <SmTitle>Postar fotos</SmTitle>
      <p>Quando você postar fotos, elas aparecerão aqui.</p>
      <Link to="/profile/create" className="link-sm-underline-blue">
        Poste sua primeira foto!
      </Link>
    </div>
  );
};

export default Posts;
