import PageTitle from "../../PageTitle";

type Props = React.HTMLAttributes<HTMLElement> & {
  profileId: string;
};

const ProfileIdHeader = ({ profileId }: Props) => {
  return (
    <header className="flex flex-col gap-4 justify-between items-center flex-wrap xxs:flex-row">
      <PageTitle>Posts</PageTitle>
      <h3 className="font-title-sm wrap-break-word min-w-0 text-base-700">
        @{profileId}
      </h3>
    </header>
  );
};

export default ProfileIdHeader;
