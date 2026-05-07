import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const ButtonSubmit = ({ children, ...props }: Props) => {
  return (
    <button
      className={clsx(
        props.className,
        "button-form bg-interactive-700 text-base-100 disabled:hover:bg-base-700 disabled:focus-visible:bg-base-700 disabled:cursor-default",
      )}
      tabIndex={props.tabIndex}
      disabled={props.disabled}
      aria-label={props["aria-label"]}
      type="submit"
    >
      {children}
    </button>
  );
};

export default ButtonSubmit;
