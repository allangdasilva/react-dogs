import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../../../features/auth/store/auth.store";

type Props = {
  to?: string;
  className?: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
};

const MobileMenuItem = ({ to, icon, label }: Props) => {
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

  const content = (
    <div className="flex gap-3">
      {icon}
      <span>{label}</span>
    </div>
  );

  return (
    <DropdownMenu.Item asChild>
      {to ? (
        <Link className="group" to={to}>
          {content}
        </Link>
      ) : (
        <button
          onClick={handleLogout}
          className="cursor-pointer group"
          type="button"
        >
          {content}
        </button>
      )}
    </DropdownMenu.Item>
  );
};

export default MobileMenuItem;
