import { useMatches } from "@tanstack/react-router";
import Heading1 from "../../common/Heading1";
import DesktopMenu from "./menu/DesktopMenu";
import MobileMenu from "./menu/MobileMenu";

const ProfileHeader = () => {
  const matches = useMatches();
  // Encontra o último match que possui o campo 'title' no staticData
  // Isso evita pegar rotas intermediárias ou layouts sem título
  const lastMatchWithTitle = [...matches]
    .reverse()
    .find((m) => (m.staticData as any)?.title);
  const pageTitle = (lastMatchWithTitle?.staticData as any)?.title || "Perfil";

  return (
    <header className="flex flex-col">
      <div className="flex flex-col gap-4 justify-between items-center flex-wrap xxs:flex-row">
        <Heading1>{pageTitle}</Heading1>
        <nav>
          <MobileMenu />
          <DesktopMenu />
        </nav>
      </div>
    </header>
  );
};

export default ProfileHeader;
