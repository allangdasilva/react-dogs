import { useSuspenseQuery } from "@tanstack/react-query";
import { photoQueryOptions } from "../../../../features/auth/api/queries/photo.query";

type Props = React.HTMLAttributes<HTMLUListElement> & {
  photo_id: number;
};

const ModalComments = ({ photo_id }: Props) => {
  const { data } = useSuspenseQuery(photoQueryOptions(photo_id));

  return (
    <ul className="mt-2">
      {data.comments.map((comment) => (
        <li
          key={comment.comment_ID}
          className="font-body-sm text-base-700 *:wrap-break-word"
        >
          <h3 className="font-semibold inline">{comment.comment_author}: </h3>
          <span className="min-w-0">{comment.comment_content}</span>
        </li>
      ))}
    </ul>
  );
};

export default ModalComments;
