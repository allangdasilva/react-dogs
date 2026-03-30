import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Form from "../../../components/form/Form";
import InputField from "../../../components/form/InputField";
import ButtonSubmit from "../../../components/form/ButtonSubmit";
import {
  loginFormSchema,
  type LoginFormSchema,
} from "../types/loginForm.schema";
import { useLoginMutation } from "../api/useLoginMutation";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    mode: "onBlur",
  });

  const { mutate, error } = useLoginMutation();

  function handleLogin(credentials: LoginFormSchema) {
    mutate(credentials);
  }

  return (
    <Form onSubmit={handleSubmit(handleLogin)} className="mt-6">
      <div className="auth-form-fields-wrapper">
        <InputField
          id="username"
          label="Usuário"
          type="text"
          placeholder="Usuário"
          {...register("username")}
          error={errors.username}
        />
        <InputField
          id="password"
          label="Senha"
          type="password"
          placeholder="Senha"
          {...register("password")}
          error={errors.password}
        />
      </div>

      {error && (
        <span className="font-body-sm text-error">{error.message}</span>
      )}

      <ButtonSubmit>Avançar</ButtonSubmit>
    </Form>
  );
};

export default LoginForm;
