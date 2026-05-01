import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useAuthStore } from "../../../features/auth/store/auth.store";
import { userQueryOptions } from "../../../features/auth/api/queries/user.query";
import {
  commentFormSchema,
  type CommentFormSchema,
} from "../../../features/auth/types/commentForm";
import { useCommentMutation } from "../../../features/auth/api/useCommentMutation";
import TextareaField from "../../form/TextareaField";
import ButtonSubmit from "../../form/ButtonSubmit";
import CommentIcon from "../../svgs/CommentIcon";
import Form from "../../form/Form";
import Fieldset from "../../form/Fieldset";

type Props = React.HTMLAttributes<HTMLElement> & {
  photo_id: number;
};

const ModalFormComment = ({ photo_id, ...props }: Props) => {
  const token = useAuthStore((s) => s.token);
  const { data: user } = useQuery(userQueryOptions(token));

  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<CommentFormSchema>({
    resolver: zodResolver(commentFormSchema),
  });

  const { mutate, isPending } = useCommentMutation(reset);

  function handleComment(data: CommentFormSchema) {
    mutate({ id: photo_id, data });
  }

  if (!user) return null;
  return (
    <section className={clsx("w-full", props.className)}>
      <Form onSubmit={handleSubmit(handleComment)}>
        <Fieldset isPending={isPending}>
          <div className="flex gap-2">
            <TextareaField
              id="comment"
              label="Comente"
              placeholder="Comente..."
              rows={1}
              {...register("comment")}
            />

            <ButtonSubmit
              disabled={!isValid}
              tabIndex={!isValid ? -1 : 0}
              className={clsx("py-2 px-4 max-w-fit", {
                "opacity-60": !isValid,
              })}
            >
              <CommentIcon />
            </ButtonSubmit>
          </div>
        </Fieldset>
      </Form>
    </section>
  );
};

export default ModalFormComment;
