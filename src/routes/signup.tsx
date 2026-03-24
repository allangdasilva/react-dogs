import { createFileRoute } from "@tanstack/react-router";
import Form from "../ui/form/Form";
import InputField from "../ui/form/InputField";
import ButtonSubmit from "../ui/form/ButtonSubmit";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="auth-wrapper sm:before:bg-[url(/img/signup-bg.jpg)]">
      <div className="auth-form-wrapper">
        <h2 className="page-title">Criar conta</h2>

        <Form className="mt-6">
          <div className="auth-form-fields-wrapper">
            <InputField
              id="user"
              label="Usuário"
              type="text"
              placeholder="Nome de usuário"
            />
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

          <ButtonSubmit>Criar</ButtonSubmit>
        </Form>
      </div>
    </section>
  );
}
