import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Form from "../../../components/form/Form";
import InputField from "../../../components/form/InputField";
import ButtonSubmit from "../../../components/form/ButtonSubmit";
import { loginFormSchema, type LoginFormSchema } from "../types/login.schema";

const LoginForm = () => {
  const {
    register,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    mode: "onBlur",
  });

  return (
    <Form className="mt-6">
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

      <ButtonSubmit>Avançar</ButtonSubmit>
    </Form>
  );
};

export default LoginForm;
