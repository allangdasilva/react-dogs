import LogoIcon from "./svgs/LogoIcon";
import AnchorRouter from "./AnchorRouter";
import { useAuthStore } from "../features/auth/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "../features/auth/api/get-user";
import type { UserSchema } from "../features/auth/types/user.schema";
import HomeIcon from "./svgs/HomeIcon";
import AnchorLabel from "./AnchorLabel";

const anchorElementPrimary =
  "px-6 bg-primary hover:bg-primary-dark focus-visible:bg-primary-dark";

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
      <div className="max-w-base p-4">
        <nav className="flex flex-col items-center justify-center gap-6 text-base-700 xs:flex-row xs:justify-between">
          <AnchorRouter
            className=" hover:bg-base-300 focus-visible:bg-base-300"
            to="/"
          >
            <HomeIcon />
            <AnchorLabel>Início</AnchorLabel>
          </AnchorRouter>

          <div className="flex flex-col items-center justify-center gap-6 xxs:flex-row">
            {user ? <AuthBar user={user} /> : <PublicBar />}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

function AuthBar({ user }: { user: UserSchema }) {
  const { nome } = user;
  return (
    <>
      <p className="font-body-sm font-semibold capitalize">
        {nome.toLowerCase()}
      </p>
      <AnchorRouter to="/profile" className={anchorElementPrimary}>
        Perfil
      </AnchorRouter>
    </>
  );
}

function PublicBar() {
  return (
    <>
      <AnchorRouter className={anchorElementPrimary} to="/login">
        Entrar
      </AnchorRouter>
      <AnchorRouter
        className="px-6 bg-base-200 hover:bg-base-300 focus-visible:bg-base-300"
        to="/signup"
      >
        Criar conta
      </AnchorRouter>
    </>
  );
}
