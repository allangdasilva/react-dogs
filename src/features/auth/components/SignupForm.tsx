import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../../../components/form/InputField";
import ButtonSubmit from "../../../components/form/ButtonSubmit";
import {
  signupFormSchema,
  type SignupFormSchema,
} from "../types/signupForm.schema";
import Form from "../../../components/form/Form";

const SignupForm = () => {
  const {
    register,
    formState: { errors },
  } = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
    mode: "onBlur",
  });

  return (
    <Form className="mt-6">
      <div className="auth-form-fields-wrapper">
        <InputField
          id="user"
          label="Usuário"
          type="text"
          placeholder="Nome de usuário"
          {...register("username")}
          error={errors.username}
        />
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="Email"
          {...register("email")}
          error={errors.email}
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

      <ButtonSubmit>Criar</ButtonSubmit>
    </Form>
  );
};

export default SignupForm;
