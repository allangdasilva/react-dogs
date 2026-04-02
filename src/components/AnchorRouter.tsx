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
        "flex flex-col items-center px-4 py-2 font-anchor-base font-medium rounded-base whitespace-nowrap transition-colors ease-in",
        className,
      )}
    >
      {children}
    </Link>
  );
};

export default AnchorRouter;
