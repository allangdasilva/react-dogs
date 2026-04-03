import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../features/auth/store/auth.store";
import { fetchCurrentUser } from "../features/auth/api/get-user";
import AnchorRouter from "./AnchorRouter";
import HomeIcon from "./svgs/HomeIcon";
import AnchorLabel from "./AnchorLabel";
import ProfileIcon from "./svgs/ProfileIcon";
import SignupIcon from "./svgs/SignupIcon";

const Header = () => {
  const token = useAuthStore((s) => s.token);

  // não estou desestruturando user de data, estou renomeando data para user!
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: fetchCurrentUser,
    enabled: !!token, // evita que ele tente buscar sem token
    // staledTime: Infinity garante que ele use o que está no cache sem refetch imediato
    staleTime: Infinity,
  });

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-base-100">
      <div className="max-w-base px-4 py-3">
        <nav className="flex flex-col items-center justify-center gap-3 text-base-700 xs:flex-row xs:justify-between">
          <AnchorRouter
            className=" hover:bg-base-300 focus-visible:bg-base-300"
            to="/"
          >
            <HomeIcon />
            <AnchorLabel>Início</AnchorLabel>
          </AnchorRouter>

          {user ? <AuthBar /> : <PublicBar />}
        </nav>
      </div>
    </header>
  );
};

export default Header;

function AuthBar() {
  return (
    <div>
      <AnchorRouter to="/profile" className="anchor-bg-200">
        <ProfileIcon />
        <AnchorLabel>Perfil</AnchorLabel>
      </AnchorRouter>
    </div>
  );
}

function PublicBar() {
  return (
    <div className="flex items-center justify-center gap-3">
      <AnchorRouter className="anchor-bg-primary" to="/login">
        <ProfileIcon />
        <AnchorLabel>Entrar</AnchorLabel>
      </AnchorRouter>

      <AnchorRouter className="anchor-bg-200" to="/signup">
        <SignupIcon />
        <AnchorLabel>Criar conta</AnchorLabel>
      </AnchorRouter>
    </div>
  );
}
