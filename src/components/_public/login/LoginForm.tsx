import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Route } from "../../../routes/_public/login";
import { useLoginMutation } from "../../../features/auth/api/mutations/useLoginMutation";
import Form from "../../common/form/Form";
import Fieldset from "../../common/form/Fieldset";
import InputField from "../../common/form/InputField";
import ButtonSubmit from "../../common/form/ButtonSubmit";
import ErrorForm from "../../common/form/ErrorForm";
import {
  loginFormSchema,
  type LoginFormSchema,
} from "../../../features/auth/types/login/loginForm.schema";

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
  const { mutate, isError, isPending, error } = useLoginMutation({
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

        <div className="mt-1">{isError && <ErrorForm error={error} />}</div>
      </Fieldset>
    </Form>
  );
};

export default LoginForm;
