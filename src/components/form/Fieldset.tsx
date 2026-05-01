import clsx from "clsx";

type Props = React.FieldsetHTMLAttributes<HTMLFieldSetElement> & {
  isPending: boolean;
  children: React.ReactNode;
};

const Fieldset = ({ isPending, children }: Props) => {
  return (
    <fieldset
      disabled={isPending}
      className={clsx({
        "opacity-60": isPending,
      })}
    >
      {children}
    </fieldset>
  );
};

export default Fieldset;
