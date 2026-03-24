import { createFileRoute, Link } from "@tanstack/react-router";
import Form from "../ui/form/Form";
import ButtonSubmit from "../ui/form/ButtonSubmit";
import InputField from "../ui/form/InputField";
import AnchorRouter from "../ui/AnchorRouter";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="auth-wrapper sm:before:bg-[url(/img/login-bg.jpg)]">
      <div className="auth-form-wrapper">
        <h2 className="page-title">Entrar</h2>

        <Form className="mt-6">
          <div className="auth-form-fields-wrapper">
            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="Email"
            />
            <InputField
              id="password"
              label="Senha"
              type="password"
              placeholder="Senha"
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
