import PageTitle from "../PageTitle";
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import ProfileMenu from "./ProfileMenu";

const ProfileHeader = () => {
  return (
    <header className="flex justify-between items-center flex-wrap px-4 py-12 max-w-base">
      <PageTitle>Minha Conta</PageTitle>
      <nav>
        <ProfileDropdownMenu />
        <ProfileMenu />
      </nav>
    </header>
  );
};

export default ProfileHeader;
