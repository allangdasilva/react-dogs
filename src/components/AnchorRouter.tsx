import clsx from "clsx";
import { Link, type LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";

type AnchorProps = LinkProps & {
  children: ReactNode;
  className?: string;
};

const AnchorRouter = ({ children, className, ...props }: AnchorProps) => {
  return (
    <Link
      {...props}
      className={clsx(
        "p-3 font-body-sm font-semibold rounded-base whitespace-nowrap transition-colors ease-in",
        className,
      )}
    >
      {children}
    </Link>
  );
};

export default AnchorRouter;
