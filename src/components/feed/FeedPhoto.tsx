import React from "react";
import type { PhotoSchema } from "../../features/auth/types/photos.schema";
import EyeIcon from "../svgs/EyeIcon";

type Props = React.LiHTMLAttributes<HTMLLIElement> & {
  photo: PhotoSchema;
};

const FeedPhoto = ({ photo, ...props }: Props) => {
  return (
    <li
      className="relative flex rounded-base overflow-hidden aspect-square md:nth-2:col-start-2 md:nth-2:col-end-4 md:nth-2:row-span-2 group transition-colors ease-in"
      {...props}
    >
      <img className="object-cover" src={photo.src} alt={photo.title} />
      <div className="absolute p-3 inset-0 bg-base-700/60 opacity-0 group-hover:opacity-100 transition-opacity ease-in pointer-events-none">
        <div className="flex items-center justify-end gap-1">
          <EyeIcon />
          <span className="font-body-xs text-base-100">{photo.acessos}</span>
        </div>
      </div>
    </li>
  );
};

export default FeedPhoto;
