import type { ReactNode } from "react";

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  descriptionValue: string;
  ageOrWeigth: string;
};

const ModalDescription = ({
  descriptionValue,
  ageOrWeigth,
  children,
}: Props) => {
  return (
    <span className="font-body-sm text-base-700">
      <span className="font-bold">{children} </span>
      {descriptionValue} {ageOrWeigth === "age" ? "anos" : "kg"}
    </span>
  );
};

export default ModalDescription;
