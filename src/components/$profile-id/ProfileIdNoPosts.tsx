import TitleSm from "../common/TitleSm";
import BoneIcon from "../svgs/BoneIcon";

const ProfileIdNoPosts = () => {
  return (
    <div className="flex flex-col gap-6 items-center text-center text-base-700">
      <BoneIcon />
      <TitleSm>Ainda não há nenhum post</TitleSm>
    </div>
  );
};

export default ProfileIdNoPosts;
