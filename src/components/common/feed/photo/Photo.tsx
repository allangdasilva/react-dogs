import Image from "../../../helper/Image";
import type { PhotoResponseSchema } from "../../../../features/auth/types/photosResponse.schema";

type Props = {
  photo: PhotoResponseSchema;
};

const Photo = ({ photo }: Props) => {
  return (
    <div className="flex flex-1">
      <Image src={photo.src} alt={photo.title} />
      <div className="absolute inset-0 bg-[#1b1a18]/40 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity ease-in pointer-events-none"></div>
    </div>
  );
};

export default Photo;
