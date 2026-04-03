import { Link } from "@tanstack/react-router";
import PetBowlIcon from "../../svgs/PetBowlIcon";

const Posts = () => {
  return (
    <div className="max-w-base px-4 py-14 flex flex-col gap-6 items-center text-center">
      <PetBowlIcon />
      <h3 className="font-title-sm">Postar fotos</h3>
      <p>Quando você postar fotos, elas aparecerão aqui.</p>
      <Link
        to="/profile/post"
        className="font-body-sm text-link hover:underline focus:underline"
      >
        Poste sua primeira foto!
      </Link>
    </div>
  );
};

export default Posts;
