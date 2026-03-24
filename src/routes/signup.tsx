import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signupFormSchema,
  type SignupFormData,
} from "../schemas/signup.schema";
import Form from "../ui/form/Form";
import InputField from "../ui/form/InputField";
import ButtonSubmit from "../ui/form/ButtonSubmit";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
    mode: "onBlur",
  });

  const handleSignup = (data: SignupFormData) => {
    console.log(data);
  };

  return (
    <section className="auth-wrapper sm:before:bg-[url(/img/signup-bg.jpg)]">
      <div className="auth-form-wrapper">
        <h2 className="page-title">Criar conta</h2>

        <Form onSubmit={handleSubmit(handleSignup)} className="mt-6">
          <div className="auth-form-fields-wrapper">
            <InputField
              id="user"
              label="Usuário"
              type="text"
              placeholder="Nome de usuário"
              {...register("user")}
              error={errors.user}
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
      </div>
    </section>
  );
}
