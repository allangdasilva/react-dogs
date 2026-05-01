import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { usePasswordLostMutation } from "../../../../features/auth/api/usePasswordLostMutation";
import Form from "../../../form/Form";
import InputField from "../../../form/InputField";
import ErrorForm from "../../../form/ErrorForm";
import ButtonSubmit from "../../../form/ButtonSubmit";
import {
  passwordLostFormSchema,
  type PasswordLostFormSchema,
} from "../../../../features/auth/types/passwordLostFormSchema";

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
      <fieldset
        disabled={isPending}
        className={clsx({
          "opacity-60": isPending,
        })}
      >
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
        {error && <ErrorForm error={error} />}

        <div className="mt-6">
          {
            // as vezes um ternário causa salto visual em componentes, então altere só o estado insterno para garantir que não tenha esse salto
            <ButtonSubmit disabled={isPending}>
              {isPending ? "Enviando..." : "Enviar"}
            </ButtonSubmit>
          }
        </div>
      </fieldset>
    </Form>
  );
};

export default PasswordLostForm;
