import Modal from "./modal/Modal";
import type { PhotosSchema } from "../../features/auth/types/photos.schema";

type Props = React.HTMLAttributes<HTMLElement> & {
  photos: PhotosSchema;
};

const Feed = ({ photos }: Props) => {
  return (
    <section className="max-w-base px-4 py-12">
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {photos.map((photo) => (
          <li
            className="relative flex rounded-base overflow-hidden md:nth-2:col-start-2 md:nth-2:col-end-4 md:nth-2:row-span-2 transition-colors ease-in has-focus-visible:outline-2 outline-base-900"
            key={photo.id}
          >
            <Modal photo={photo} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Feed;
