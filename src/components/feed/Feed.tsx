import React from "react";
import type { PhotosSchema } from "../../features/auth/types/photos.schema";
import FeedPhoto from "./FeedPhoto";

type Props = React.HTMLAttributes<HTMLElement> & {
  photos: PhotosSchema;
};

const Feed = ({ photos }: Props) => {
  return (
    <section className="max-w-base px-4 py-12">
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {photos.map((photo) => (
          <FeedPhoto key={photo.id} photo={photo} />
        ))}
      </ul>
    </section>
  );
};

export default Feed;
