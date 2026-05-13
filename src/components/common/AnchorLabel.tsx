import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  children: React.ReactNode;
};

const AnchorLabel = ({ children, ...props }: Props) => {
  return (
    <span
      className={clsx(
        "font-icon-label text-neutral-dogs-900/90",
        props.className,
      )}
    >
      {children}
    </span>
  );
};

export default AnchorLabel;
