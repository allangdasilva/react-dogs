import type { CommentResponseSchema } from "../../features/auth/types/comment/commentResponse.schema";

type Props = {
  comments: CommentResponseSchema[];
};

const PhotoPageComments = ({ comments }: Props) => {
  if (!comments.length) return null;
  return (
    <ul className="p-3 rounded-base min-h-30 max-h-30 overflow-scroll scrollbar-none bg-neutral-dogs-200">
      {comments.map((comment) => (
        <li
          key={comment.comment_ID}
          className="font-body-primary text-neutral-dogs-900/90 *:wrap-break-word"
        >
          <h3 className="font-semibold inline">{comment.comment_author}: </h3>
          <span className="min-w-0">{comment.comment_content}</span>
        </li>
      ))}
    </ul>
  );
};

export default PhotoPageComments;
