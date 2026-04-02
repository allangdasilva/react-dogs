import type { ReactNode } from "react";

type AnchorProps = React.HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};

const AnchorLabel = ({ children, ...props }: AnchorProps) => {
  return (
    <span className="font-anchor-base font-medium text-base-700" {...props}>
      {children}
    </span>
  );
};

export default AnchorLabel;
