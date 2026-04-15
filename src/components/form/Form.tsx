import clsx from "clsx";
import { type ReactNode } from "react";

type Props = React.FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode;
};

const Form = ({ children, ...props }: Props) => {
  return (
    <form
      className={clsx("flex flex-col gap-6", props.className)}
      onSubmit={props.onSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
