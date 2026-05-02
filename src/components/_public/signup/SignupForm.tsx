import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSigupMutation } from "../../../features/auth/api/mutations/useSignupMutation";
import Form from "../../common/form/Form";
import Fieldset from "../../common/form/Fieldset";
import InputField from "../../common/form/InputField";
import ButtonSubmit from "../../common/form/ButtonSubmit";
import ErrorForm from "../../common/form/ErrorForm";
import {
  signupFormSchema,
  type SignupFormSchema,
} from "../../../features/auth/types/signup/signupForm.schema";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
    mode: "onBlur",
  });

  const { mutate, error, isPending } = useSigupMutation();

  function handleSignup(credentials: SignupFormSchema) {
    mutate(credentials);
  }

  return (
    <Form onSubmit={handleSubmit(handleSignup)} className="w-full">
      <Fieldset isPending={isPending}>
        <div className="form-fields-wrapper">
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

        <div className="mt-6">
          <ButtonSubmit disabled={isPending}>
            {isPending ? "Criando..." : "Criar"}
          </ButtonSubmit>
        </div>

        <div className="mt-1">{error && <ErrorForm error={error} />}</div>
      </Fieldset>
    </Form>
  );
};

export default SignupForm;
