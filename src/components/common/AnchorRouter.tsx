import clsx from "clsx";
import { Link, type LinkProps } from "@tanstack/react-router";

type Props = LinkProps & {
  children: React.ReactNode;
  className?: string;
};

const AnchorRouter = ({ children, className, ...props }: Props) => {
  return (
    <Link
      {...props}
      className={clsx(
        "flex flex-col items-center px-4 py-2 rounded-base whitespace-nowrap transition-colors-ease-in",
        className,
      )}
    >
      {children}
    </Link>
  );
};

export default AnchorRouter;
