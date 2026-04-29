import PageTitle from "../../PageTitle";
import SmTitle from "../../SmTitle";

type Props = React.HTMLAttributes<HTMLElement> & {
  profileId: string;
};

const ProfileIdHeader = ({ profileId }: Props) => {
  return (
    <header className="flex flex-col gap-4 justify-between items-center flex-wrap xxs:flex-row">
      <PageTitle>Posts</PageTitle>
      <SmTitle>@{profileId}</SmTitle>
    </header>
  );
};

export default ProfileIdHeader;
