import { Link, type LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";
import LogoIcon from "./svgs/LogoIcon";

const Header = () => {
  return (
    <header>
      <nav>
        <a href=""></a>
        <Button to="/">
          <LogoIcon />
        </Button>

        <div>
          <Button to="/">Entrar</Button>
          <Button to="/">Criar conta</Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

interface ButtonProps extends LinkProps {
  children: ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return <Link {...props}>{children}</Link>;
};
