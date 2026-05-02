import { Link } from "@tanstack/react-router";
import TitleBase from "../../common/TitleBase";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <section className="public-section-wrapper">
      <div className="public-section-background bg-[url(/img/login-bg.jpg)]"></div>
      <div className="public-section-form-wrapper">
        <div className="mb-6">
          <TitleBase>Entrar</TitleBase>
        </div>

        <LoginForm />

        <Link
          to="/password/lost"
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
