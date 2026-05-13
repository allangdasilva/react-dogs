import Heading1 from "../common/Heading1";
import Heading2 from "../common/Heading2";

type Props = React.HTMLAttributes<HTMLElement> & {
  profileId: string;
};

const ProfileIdHeader = ({ profileId }: Props) => {
  return (
    <header className="flex flex-col gap-4 justify-between items-center flex-wrap xxs:flex-row">
      <Heading1>Posts</Heading1>
      <Heading2>@{profileId}</Heading2>
    </header>
  );
};

export default ProfileIdHeader;
