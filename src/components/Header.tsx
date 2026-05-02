import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useAuthStore } from "../features/auth/store/auth.store";
import { userQueryOptions } from "../features/auth/api/queries/user.query";
import AnchorRouter from "./common/AnchorRouter";
import AnchorLabel from "./common/AnchorLabel";
import HomeIcon from "./svgs/HomeIcon";
import ProfileIcon from "./svgs/ProfileIcon";
import SignupIcon from "./svgs/SignupIcon";

const Header = () => {
  const token = useAuthStore((s) => s.token);

  // não estou desestruturando user de data, estou renomeando data para user!
  const { data: user } = useQuery(userQueryOptions(token));

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-base-100">
      <div className="max-w-base px-4 py-3">
        <nav
          className={clsx(
            "flex flex-col items-center justify-center gap-3 text-base-700 xs:flex-row xs:justify-between",
            { "xxs:flex-row xxs:justify-between": user },
          )}
        >
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
      <AnchorRouter
        to="/profile"
        activeProps={{ className: "anchor-bg-primary" }}
        className="anchor-bg-200"
      >
        <ProfileIcon />
        <AnchorLabel>Perfil</AnchorLabel>
      </AnchorRouter>
    </div>
  );
}

function PublicBar() {
  return (
    <div className="flex items-center justify-center gap-3">
      <AnchorRouter
        className="anchor-bg-300"
        to="/login"
        activeProps={{ className: "anchor-bg-primary" }}
      >
        <ProfileIcon />
        <AnchorLabel>Entrar</AnchorLabel>
      </AnchorRouter>

      <AnchorRouter
        className="anchor-bg-200"
        to="/signup"
        activeProps={{ className: "anchor-bg-primary" }}
      >
        <SignupIcon />
        <AnchorLabel>Criar conta</AnchorLabel>
      </AnchorRouter>
    </div>
  );
}
