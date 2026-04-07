import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};
const Spacer = ({ className, ...props }: Props) => {
  return (
    <div
      {...props}
      className={clsx("w-full h-px rounded-full", className)}
    ></div>
  );
};

export default Spacer;
