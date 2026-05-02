import TitleBase from "../common/TitleBase";
import TitleSm from "../common/TitleSm";

type Props = React.HTMLAttributes<HTMLElement> & {
  profileId: string;
};

const ProfileIdHeader = ({ profileId }: Props) => {
  return (
    <header className="flex flex-col gap-4 justify-between items-center flex-wrap xxs:flex-row">
      <TitleBase>Posts</TitleBase>
      <TitleSm>@{profileId}</TitleSm>
    </header>
  );
};

export default ProfileIdHeader;
