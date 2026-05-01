import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Form from "../../../components/form/Form";
import { Route } from "../../../routes/_public/login";
import ErrorForm from "../../../components/form/ErrorForm";
import { useLoginMutation } from "../api/useLoginMutation";
import InputField from "../../../components/form/InputField";
import ButtonSubmit from "../../../components/form/ButtonSubmit";
import {
  loginFormSchema,
  type LoginFormSchema,
} from "../types/loginForm.schema";
import Fieldset from "../../../components/form/Fieldset";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    mode: "onBlur",
  });

  // 1. Route.useSearch(): Hook do TanStack que lê os parâmetros de busca já validados pelo validateSearch.
  // Como estamos dentro de um arquivo da rota de login, ele sabe exatamente que existe o campo 'redirect'.
  const search = Route.useSearch();

  // 2. useLoginMutation: Nosso hook de login customizado.
  // Passamos o 'search.redirect' como destino (o 'redirectTo' que criamos nas options do hook).
  // Se o usuário veio de um redirecionamento, ele vai para lá. Se veio direto pro login, search.redirect é undefined e o hook usará "/"
  const { mutate, error, isPending } = useLoginMutation({
    redirectTo: search.redirect,
  });

  function handleLogin(credentials: LoginFormSchema) {
    // Dispara a mutation. O sucesso desta mutation completará o fluxo navegando para o destino correto.
    mutate(credentials);
  }

  return (
    <Form onSubmit={handleSubmit(handleLogin)}>
      <Fieldset isPending={isPending}>
        <div className="form-fields-wrapper">
          <InputField
            id="username"
            label="Usuário"
            type="text"
            placeholder="Nome de usuário"
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

        <div className="mt-6">
          <ButtonSubmit disabled={isPending}>
            {isPending ? "Entrando..." : "Entrar"}
          </ButtonSubmit>
        </div>

        <div className="mt-1">{error && <ErrorForm error={error} />}</div>
      </Fieldset>
    </Form>
  );
};

export default LoginForm;
