import type { PhotoSchema } from "../../../features/auth/types/photos.schema";
import Image from "../../helper/Image";

type Props = {
  photo: PhotoSchema;
};

const Photo = ({ photo }: Props) => {
  return (
    <div>
      <Image src={photo.src} alt={photo.title} />
      <div className="absolute inset-0 bg-base-700/60 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity ease-in pointer-events-none"></div>
    </div>
  );
};

export default Photo;
