import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import PageTitle from "../PageTitle";
import LoginForm from "../../features/auth/components/LoginForm";

const Login = () => {
  return (
    <section className="grid sm:grid-cols-2 sm:gap-4">
      <div className="hidden sm:block">
        <div className="absolute inset-0 grid grid-cols-2 gap-4 pt-19">
          <div className="bg-center bg-cover bg-[url(img/login-bg.jpg)]"></div>
        </div>
      </div>
      <div
        className={clsx("flex flex-col items-center sm:items-stretch", {
          "opacity-60": false,
        })}
      >
        <div className="mb-6">
          <PageTitle>Entrar</PageTitle>
        </div>

        <LoginForm />

        <Link
          to="/"
          className="button-form mt-3 text-base-700 hover:bg-base-300 focus:bg-base-300"
        >
          Esqueceu a Senha?
        </Link>

        <p className="mt-6 font-body-sm text-base-700">
          Não tem uma conta?{" "}
          <Link className="link-sm-underline-blue" to="/signup">
            Crie uma!
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
