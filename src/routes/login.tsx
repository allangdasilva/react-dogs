import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, type LoginFormData } from "../schemas/login.schema";
import Form from "../ui/form/Form";
import ButtonSubmit from "../ui/form/ButtonSubmit";
import InputField from "../ui/form/InputField";
import AnchorRouter from "../ui/AnchorRouter";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: "onBlur",
  });

  const handleLogin = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <section className="auth-wrapper sm:before:bg-[url(/img/login-bg.jpg)]">
      <div className="auth-form-wrapper">
        <h2 className="page-title">Entrar</h2>

        <Form onSubmit={handleSubmit(handleLogin)} className="mt-6">
          <div className="auth-form-fields-wrapper">
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

          <ButtonSubmit>Avançar</ButtonSubmit>
        </Form>

        <AnchorRouter
          to="/"
          className="mt-3 text-center rounded-base text-base-700 hover:bg-base-300 focus:bg-base-300"
        >
          Esqueceu a Senha?
        </AnchorRouter>

        <p className="mt-6 font-body-sm text-base-700">
          Não tem uma conta?{" "}
          <Link
            className="text-link hover:underline focus:underline"
            to="/signup"
          >
            Crie uma!
          </Link>
        </p>
      </div>
    </section>
  );
}
