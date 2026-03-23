import LogoIcon from "./svgs/LogoIcon";
import AnchorRouter from "./AnchorRouter";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-base-100">
      <div className="max-w-base p-4">
        <nav className="flex flex-col items-center justify-center gap-6 text-base-700 xs:flex-row xs:justify-between">
          <AnchorRouter
            className="inline-block hover:bg-base-300 focus-visible:bg-base-300"
            to="/"
          >
            <LogoIcon />
          </AnchorRouter>

          <div className="flex flex-col items-center justify-center gap-6 *:font-body-sm *:font-semibold xxs:flex-row">
            <AnchorRouter
              className="px-6 bg-primary hover:bg-primary-dark focus-visible:bg-primary-dark"
              to="/login"
            >
              Entrar
            </AnchorRouter>
            <AnchorRouter
              className="px-6 bg-base-200 hover:bg-base-300 focus-visible:bg-base-300"
              to="/signup"
            >
              Criar conta
            </AnchorRouter>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
