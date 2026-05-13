import Heading2 from "../common/Heading2";
import BoneIcon from "../svgs/BoneIcon";

const ProfileIdNoPosts = () => {
  return (
    <div className="flex flex-col gap-6 items-center text-center text-neutral-dogs-900">
      <BoneIcon />
      <Heading2>Ainda não há nenhum post</Heading2>
    </div>
  );
};

export default ProfileIdNoPosts;
