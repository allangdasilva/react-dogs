import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};
const Spacer = ({ className }: Props) => {
  return <div className={clsx("w-full h-px rounded-full", className)}></div>;
};

export default Spacer;
