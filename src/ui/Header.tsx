import clsx from "clsx";
import type { ReactNode } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import LogoIcon from "./svgs/LogoIcon";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-base-100">
      <div className="max-w-255 mx-auto p-4">
        <nav className="flex flex-col items-center justify-center gap-6 xs:flex-row xs:justify-between">
          <Button
            className="inline-block hover:bg-base-300 focus:bg-base-300"
            to="/"
          >
            <LogoIcon />
          </Button>

          <div className="flex items-center justify-center gap-6 flex-wrap *:font-body-sm *:font-semibold *:text-center">
            <Button
              className="px-6 bg-primary hover:bg-primary-dark focus:bg-primary-dark"
              to="/"
            >
              Entrar
            </Button>
            <Button
              className="px-6 bg-base-200 hover:bg-base-300 focus:bg-base-300"
              to="/"
            >
              Criar conta
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

interface ButtonProps extends LinkProps {
  className: string;
  children: ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
  const { to, className } = props;

  return (
    <Link
      to={to}
      className={clsx("p-3 rounded-base transition-colors ease-in", className)}
    >
      {children}
    </Link>
  );
};
