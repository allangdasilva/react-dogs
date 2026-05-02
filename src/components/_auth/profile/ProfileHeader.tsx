import { useMatches } from "@tanstack/react-router";
import TitleBase from "../../common/TitleBase";
import DesktopMenu from "./menu/DesktopMenu";
import MobileMenu from "./menu/MobileMenu";

const ProfileHeader = () => {
  const matches = useMatches();
  // Pegamos a última rota da lista de matches ativos
  const lastMatch = matches[matches.length - 1];
  // Acessamos o title que definimos no staticData
  const pageTitle = (lastMatch?.staticData as any)?.title;

  return (
    <header className="flex flex-col">
      <div className="flex flex-col gap-4 justify-between items-center flex-wrap xxs:flex-row">
        <TitleBase>{pageTitle}</TitleBase>
        <nav>
          <MobileMenu />
          <DesktopMenu />
        </nav>
      </div>
    </header>
  );
};

export default ProfileHeader;
