import { useMatches } from "@tanstack/react-router";
import PageTitle from "../PageTitle";
import Spacer from "../Spacer";
import DesktopMenu from "./menu/DesktopMenu";
import MobileMenu from "./menu/MobileMenu";

const ProfileHeader = () => {
  const matches = useMatches();
  // Pegamos a última rota da lista de matches ativos
  const lastMatch = matches[matches.length - 1];
  // Acessamos o title que definimos no staticData
  const pageTitle = (lastMatch?.staticData as any)?.title;

  return (
    <header className="max-w-base px-4 pt-12 flex flex-col">
      <div className="flex flex-col gap-6 justify-between items-center flex-wrap xxs:flex-row xxs:gap-0">
        <PageTitle>{pageTitle}</PageTitle>
        <nav>
          <MobileMenu />
          <DesktopMenu />
        </nav>
      </div>
      <Spacer className="mt-12 bg-base-200" />
    </header>
  );
};

export default ProfileHeader;
