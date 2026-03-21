import clsx from "clsx";
import { Link, type LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";

type AnchorProps = LinkProps & {
  className: string;
  children: ReactNode;
};

const AnchorRouter = ({ children, className, ...props }: AnchorProps) => {
  return (
    <Link
      {...props}
      className={clsx(
        "p-3 rounded-base whitespace-nowrap transition-colors ease-in",
        className,
      )}
    >
      {children}
    </Link>
  );
};

export default AnchorRouter;
