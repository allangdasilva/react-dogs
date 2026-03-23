import clsx from "clsx";
import { type ReactNode } from "react";

type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode;
  className?: string;
};

const Form = ({ children, className, ...props }: FormProps) => {
  return (
    <form className={clsx("flex flex-col", className)} {...props}>
      {children}
    </form>
  );
};

export default Form;
