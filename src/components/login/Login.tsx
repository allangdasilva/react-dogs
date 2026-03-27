import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import PageTitle from "../PageTitle";
import AnchorRouter from "../AnchorRouter";
import LoginForm from "../../features/auth/components/LoginForm";

const Login = () => {
  return (
    <section className="auth-wrapper sm:before:bg-[url(/img/login-bg.jpg)]">
      <div
        className={clsx("auth-form-wrapper", {
          "opacity-60": false,
        })}
      >
        <PageTitle>Entrar</PageTitle>

        <LoginForm />

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
};

export default Login;
