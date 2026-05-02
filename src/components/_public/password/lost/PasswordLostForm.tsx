import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePasswordLostMutation } from "../../../../features/auth/api/mutations/usePasswordLostMutation";
import Form from "../../../common/form/Form";
import Fieldset from "../../../common/form/Fieldset";
import InputField from "../../../common/form/InputField";
import ButtonSubmit from "../../../common/form/ButtonSubmit";
import ErrorForm from "../../../common/form/ErrorForm";
import {
  passwordLostFormSchema,
  type PasswordLostFormSchema,
} from "../../../../features/auth/types/password/lost/passwordLostForm.schema";

const PasswordLostForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<PasswordLostFormSchema>({
    resolver: zodResolver(passwordLostFormSchema),
    mode: "onBlur",
  });

  const { mutate, isPending, error } = usePasswordLostMutation(reset);

  function handlePasswordLost(data: PasswordLostFormSchema) {
    const { login } = data;
    const resetUrl = `${window.location.origin}/password/reset`;

    mutate({ login, url: resetUrl });
  }

  return (
    <Form onSubmit={handleSubmit(handlePasswordLost)}>
      <Fieldset isPending={isPending}>
        <div className="form-fields-wrapper">
          <InputField
            id="login"
            type="text"
            label="Insira seu email ou nome de usuário."
            placeholder="Nome de usuário ou email"
            {...register("login")}
            error={errors.login}
          />
        </div>

        <div className="mt-6">
          <ButtonSubmit disabled={isPending}>
            {isPending ? "Enviando..." : "Enviar"}
          </ButtonSubmit>
        </div>

        <div className="mt-1">{error && <ErrorForm error={error} />}</div>
      </Fieldset>
    </Form>
  );
};

export default PasswordLostForm;
