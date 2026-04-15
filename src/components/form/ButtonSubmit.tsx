import clsx from "clsx";
import type { ReactNode } from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const ButtonSubmit = ({ children, ...props }: Props) => {
  return (
    <button
      className={clsx(
        props.className,
        "button-form text-base-100 bg-base-900 hover:bg-base-700/90 focus:bg-base-700/90",
      )}
      type="submit"
    >
      {children}
    </button>
  );
};

export default ButtonSubmit;
