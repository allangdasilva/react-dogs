import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../features/auth/store/auth.store";
import { userQueryOptions } from "../../../features/auth/api/queries/user.query,";
import TextareaField from "../../form/TextareaField";
import ButtonSubmit from "../../form/ButtonSubmit";
import CommentIcon from "../../svgs/CommentIcon";
import Form from "../../form/Form";

const ModalFormComment = () => {
  const token = useAuthStore((s) => s.token);

  const { data: user } = useQuery(userQueryOptions(token));

  if (!user) return null;
  return (
    <section className="p-3 bg-base-100">
      <Form className="flex-row gap-2!">
        <TextareaField
          id="comment"
          label="Comente"
          placeholder="Comente..."
          rows={1}
        />
        <ButtonSubmit className="py-2 px-4 max-w-fit">
          <CommentIcon />
        </ButtonSubmit>
      </Form>
    </section>
  );
};

export default ModalFormComment;
