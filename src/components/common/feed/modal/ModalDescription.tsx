import type { PhotoResponseSchema } from "../../../../features/auth/types/photosResponse.schema";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  photo: PhotoResponseSchema;
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
  children: React.ReactNode;
  value: string;
  type: "weight" | "age";
};

function Description({ value, type, children }: DescriptionProps) {
  const unit = type === "weight" ? "kg" : Number(value) === 1 ? "ano" : "anos";

  return (
    <span className="font-body-base text-base-700 ">
      <span className="font-bold">{children} </span>
      <span className="break-all">
        {value} {unit}
      </span>
    </span>
  );
}
