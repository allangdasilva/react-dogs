import type { ReactNode } from "react";

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};

const AnchorLabel = ({ children }: Props) => {
  return (
    <span className="font-anchor-base font-medium text-base-700">
      {children}
    </span>
  );
};

export default AnchorLabel;
