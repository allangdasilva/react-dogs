import { useSuspenseQuery } from "@tanstack/react-query";
import { photoQueryOptions } from "../../../features/auth/api/queries/photo.query";

type Props = React.HTMLAttributes<HTMLUListElement> & {
  photo_id: number;
};

const ModalComments = ({ photo_id }: Props) => {
  const { data: comments } = useSuspenseQuery(photoQueryOptions(photo_id));

  return (
    <ul className="mt-2">
      {comments.map((comment) => (
        <li key={comment.comment_ID} className="font-body-sm text-base-700">
          <h3 className="font-semibold inline">{comment.comment_author}: </h3>
          <span>{comment.comment_content}</span>
        </li>
      ))}
    </ul>
  );
};

export default ModalComments;
