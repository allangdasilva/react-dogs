import clsx from "clsx";

type Props = React.FormHTMLAttributes<HTMLFormElement> & {
  children: React.ReactNode;
};

const Form = ({ children, ...props }: Props) => {
  return (
    <form
      className={clsx("flex flex-col w-full", props.className)}
      onSubmit={props.onSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
