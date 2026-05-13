import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useAuthStore } from "../features/auth/store/auth.store";
import { userQueryOptions } from "../features/auth/api/queries/user.query";
import AnchorRouter from "./common/AnchorRouter";
import AnchorLabel from "./common/AnchorLabel";
import HomeIcon from "./svgs/HomeIcon";
import ProfileIcon from "./svgs/ProfileIcon";
import SignupIcon from "./svgs/SignupIcon";
import LoginIcon from "./svgs/LoginIcon";

const Header = () => {
  const token = useAuthStore((s) => s.token);

  // não estou desestruturando user de data, estou renomeando data para user!
  const { data: user } = useQuery(userQueryOptions(token));

  return (
    <header className="fixed top-0 left-0 w-full z-40 backdrop-blur-md border-b border-neutral-dogs-200/90 bg-neutral-dogs-100/90">
      <div className="max-w-base px-4 py-3">
        <nav
          className={clsx(
            "flex flex-col items-center justify-center gap-3 xs:flex-row xs:justify-between",
            { "xxs:flex-row xxs:justify-between": user },
          )}
        >
          <AnchorRouter
            className="bg-interactive-200"
            to="/"
            activeProps={{
              className: "bg-interactive-primary-500 anchor-color-active",
            }}
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
        className="bg-interactive-200"
        to="/profile"
        activeProps={{
          className: "bg-interactive-primary-500 anchor-color-active",
        }}
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
        className="bg-interactive-200"
        to="/login"
        activeProps={{ className: "bg-interactive-primary-500" }}
      >
        <LoginIcon />
        <AnchorLabel className="text-link-500!">Entrar</AnchorLabel>
      </AnchorRouter>

      <AnchorRouter
        className="bg-interactive-200"
        to="/signup"
        activeProps={{
          className: "bg-interactive-primary-500 anchor-color-active",
        }}
      >
        <SignupIcon />
        <AnchorLabel>Criar conta</AnchorLabel>
      </AnchorRouter>
    </div>
  );
}
