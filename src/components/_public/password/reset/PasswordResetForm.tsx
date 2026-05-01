import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useSearch } from "@tanstack/react-router";
import { usePasswordResetMutation } from "../../../../features/auth/api/usePasswordResetMutation";
import Form from "../../../form/Form";
import InputField from "../../../form/InputField";
import ErrorForm from "../../../form/ErrorForm";
import ButtonSubmit from "../../../form/ButtonSubmit";
import {
  passwordResetFormSchema,
  type PasswordResetFormSchema,
} from "../../../../features/auth/types/passwordResetFormSchema";
import Fieldset from "../../../form/Fieldset";

const PasswordResetForm = () => {
  // Com a rota está validada, você troca o useLocation pelo useSearch. A diferença? O TypeScript vai saber os tipos de key e login automaticamente, sem você precisar dizer "as { key: string... }".
  // O 'from' garante que estamos pegando os tipos da rota correta
  // Agora 'login' e 'key' já vêm tipados como string!
  const { login, key } = useSearch({ from: "/_public/password/reset" });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<PasswordResetFormSchema>({
    resolver: zodResolver(passwordResetFormSchema),
    mode: "onBlur",
  });

  const { mutate, isPending, error } = usePasswordResetMutation();

  function handlePasswordReset(data: PasswordResetFormSchema) {
    const { password } = data;
    // Como o seu beforeLoad já garante o redirecionamento, se esse componente chegar a renderizar, login e key com certeza existem, então você pode dizer ao TS que confia no processo usando o !.
    mutate({ login: login!, key: key!, password });
  }

  return (
    <Form onSubmit={handleSubmit(handlePasswordReset)}>
      <Fieldset isPending={isPending}>
        <div className="form-fields-wrapper">
          <InputField
            id="password"
            type="password"
            label="Nova senha"
            placeholder="Senha"
            {...register("password")}
            error={errors.password}
          />
        </div>

        <div className="mt-6">
          {/* as vezes um ternário causa salto visual em componentes, então altere só o estado insterno para garantir que não tenha esse salto */}
          <ButtonSubmit disabled={isPending}>
            {isPending ? "Alterando..." : "Alterar"}
          </ButtonSubmit>
        </div>

        <div className="mt-1">
          {error && (
            <div>
              <ErrorForm error={error} />{" "}
              <Link to="/password/lost" className="link-sm-underline-blue">
                Solicitar novo link.
              </Link>
            </div>
          )}
        </div>
      </Fieldset>
    </Form>
  );
};

export default PasswordResetForm;
