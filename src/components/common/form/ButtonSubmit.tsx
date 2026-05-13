import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const ButtonSubmit = ({ children, ...props }: Props) => {
  return (
    <button
      className={clsx(
        props.className,
        "button-form bg-interactive-800 text-neutral-dogs-100/90 disabled:hover:bg-neutral-dogs-800 disabled:focus-visible:bg-neutral-dogs-800 disabled:cursor-default",
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
