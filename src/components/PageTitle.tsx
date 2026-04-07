import { type ReactNode } from "react";

type PageTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode;
};

const PageTitle = ({ children, ...props }: PageTitleProps) => {
  return (
    <h2
      className="relative font-title-base text-base-700 after:absolute after:bottom-1 after:-left-1 after:w-4 after:h-4 after:bg-[url(/img/pegada.svg)] after:bg-center after:pointer-events-none"
      {...props}
    >
      {children}
    </h2>
  );
};

export default PageTitle;
