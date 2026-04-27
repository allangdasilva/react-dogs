import type { ReactNode } from "react";
import type { PhotoSchema } from "../../../features/auth/types/photos.schema";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  photo: PhotoSchema;
};

const ModalDescription = ({ photo }: Props) => {
  return (
    <div className="flex flex-col">
      <Description value={photo.peso} type="weight">
        Peso:
      </Description>
      <Description value={photo.idade} type="age">
        Idade:
      </Description>
    </div>
  );
};

export default ModalDescription;

type DescriptionProps = React.HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  value: string;
  type: "weight" | "age";
};

function Description({ value, type, children }: DescriptionProps) {
  const unit = type === "weight" ? "kg" : Number(value) === 1 ? "ano" : "anos";

  return (
    <span className="font-body-base text-base-700 break-all">
      <span className="font-bold">{children} </span>
      {value} {unit}
    </span>
  );
}
