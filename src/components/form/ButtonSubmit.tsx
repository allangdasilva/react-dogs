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
        "button-form text-base-100 bg-base-900 hover:bg-base-700/90 focus:bg-base-700/90 disabled:hover:bg-base-900 disabled:focus:bg-base-900 disabled:cursor-default",
      )}
      tabIndex={props.tabIndex}
      disabled={props.disabled}
      type="submit"
    >
      {children}
    </button>
  );
};

export default ButtonSubmit;
