import PageTitle from "../PageTitle";
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import ProfileMenu from "./ProfileMenu";

const ProfileHeader = () => {
  return (
    <header className="max-w-base px-4 py-12 flex flex-col">
      <div className="flex justify-between items-center flex-wrap">
        <PageTitle>Minha Conta</PageTitle>
        <nav>
          <ProfileDropdownMenu />
          <ProfileMenu />
        </nav>
      </div>
      <div className="mt-12 h-px bg-base-200"></div>
    </header>
  );
};

export default ProfileHeader;
