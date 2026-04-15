import { type ReactNode } from "react";

type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode;
};

const PageTitle = ({ children }: Props) => {
  return (
    <h2 className="relative font-title-base text-base-700 capitalize after:absolute after:bottom-1 after:-left-1 after:w-4 after:h-4 after:bg-[url(/img/pegada.svg)] after:bg-center after:pointer-events-none">
      {children}
    </h2>
  );
};

export default PageTitle;
