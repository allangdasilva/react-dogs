import clsx from "clsx";
import { Link, type LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface AnchorProps extends LinkProps {
  className: string;
  children: ReactNode;
}

const AnchorRouter = ({ children, ...props }: AnchorProps) => {
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

export default AnchorRouter;
