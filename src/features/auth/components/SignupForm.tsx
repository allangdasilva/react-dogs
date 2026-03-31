import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Form from "../../../components/form/Form";
import ErrorForm from "../../../components/form/ErrorForm";
import { useSigupMutation } from "../api/useSignupMutation";
import InputField from "../../../components/form/InputField";
import ButtonSubmit from "../../../components/form/ButtonSubmit";
import {
  signupFormSchema,
  type SignupFormSchema,
} from "../types/signupForm.schema";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
    mode: "onBlur",
  });

  const { mutate, error } = useSigupMutation();

  function handleSignup(credentials: SignupFormSchema) {
    mutate(credentials);
  }

  return (
    <Form onSubmit={handleSubmit(handleSignup)} className="mt-6">
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

      {error && <ErrorForm error={error} />}

      <ButtonSubmit>Criar</ButtonSubmit>
    </Form>
  );
};

export default SignupForm;
