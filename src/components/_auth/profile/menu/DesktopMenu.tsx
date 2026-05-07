import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../../../../features/auth/store/auth.store";
import AnchorLabel from "../../../common/AnchorLabel";
import AnchorRouter from "../../../common/AnchorRouter";
import AddIcon from "../../../svgs/AddIcon";
import ExitIcon from "../../../svgs/ExitIcon";
import PostsIcon from "../../../svgs/PostsIcon";
import StatsIcon from "../../../svgs/StatsIcon";

const DesktopMenu = () => {
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function handleLogout() {
    // Limpa o estado de autenticação (Zustand/LocalStorage)
    logout();
    // Limpa o CACHE REAL do TanStack Query
    // Fazemos isso antes ou junto com o navigate para evitar que dados antigos "pisquem" na tela
    queryClient.clear();
    // Redireciona
    navigate({ to: "/" });
  }

  return (
    <div className="hidden sm:gap-3 sm:flex sm:items-center">
      <AnchorRouter
        activeOptions={{ exact: true }}
        activeProps={{
          className: "bg-interactive-primary",
        }}
        className="bg-interactive-200"
        to="/profile"
      >
        <PostsIcon />
        <AnchorLabel>Posts</AnchorLabel>
      </AnchorRouter>
      <AnchorRouter
        activeProps={{ className: "bg-interactive-primary" }}
        className="bg-interactive-200"
        to="/profile/create"
      >
        <AddIcon />
        <AnchorLabel>Criar</AnchorLabel>
      </AnchorRouter>
      <AnchorRouter
        activeProps={{ className: "bg-interactive-primary" }}
        className="bg-interactive-200"
        to="/profile/statistics"
      >
        <StatsIcon />
        <AnchorLabel>Dados</AnchorLabel>
      </AnchorRouter>
      <button
        onClick={handleLogout}
        className="flex flex-col items-center px-4 py-2 rounded-base whitespace-nowrap outline-interactive-primary cursor-pointer group"
      >
        <ExitIcon />
        <AnchorLabel>Sair</AnchorLabel>
      </button>
    </div>
  );
};

export default DesktopMenu;
