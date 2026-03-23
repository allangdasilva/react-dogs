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
    <div className="grid sm:min-h-dvh sm:before:bg-[url(/img/login-bg.jpg)] sm:before:bg-cover sm:before:bg-center sm:grid-cols-2">
      <div className="flex flex-col pl-6 pr-4 py-12 sm:self-center sm:max-w-127.5">
        <h2 className="relative font-title-base text-base-700 after:absolute after:bottom-0 after:-left-1 after:w-4 after:h-4 after:bg-[url(/img/pegada.svg)] after:bg-center">
          Entrar
        </h2>

        <Form className="gap-6 mt-6">
          <div className="flex flex-col gap-3">
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
          <Link className="text-link hover:underline focus:underline" to="/">
            Crie uma!
          </Link>
        </p>
      </div>
    </div>
  );
}
