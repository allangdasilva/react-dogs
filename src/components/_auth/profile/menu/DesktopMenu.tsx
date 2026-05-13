import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../../../../features/auth/store/auth.store";
import AnchorLabel from "../../../common/AnchorLabel";
import AnchorRouter from "../../../common/AnchorRouter";
import ExitIcon from "../../../svgs/ExitIcon";
import PostsIcon from "../../../svgs/PostsIcon";
import CreateIcon from "../../../svgs/CreateIcon";

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
          className: "bg-interactive-primary-500 anchor-color-active",
        }}
        className="bg-interactive-200"
        to="/profile"
      >
        <PostsIcon />
        <AnchorLabel>Posts</AnchorLabel>
      </AnchorRouter>
      <AnchorRouter
        activeProps={{
          className: "bg-interactive-primary-500 anchor-color-active",
        }}
        className="bg-interactive-200"
        to="/profile/create"
      >
        <CreateIcon />
        <AnchorLabel>Criar</AnchorLabel>
      </AnchorRouter>
      <button
        onClick={handleLogout}
        className="flex flex-col items-center px-4 py-2 rounded-base outline-interactive-primary-500 cursor-pointer bg-interactive-200"
      >
        <ExitIcon />
        <AnchorLabel>Sair</AnchorLabel>
      </button>
    </div>
  );
};

export default DesktopMenu;
