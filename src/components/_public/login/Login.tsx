import { Link } from "@tanstack/react-router";
import Heading1 from "../../common/Heading1";
import Image from "../../helper/Image";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <section className="public-section-wrapper animate-content-in">
      <div className="public-section-background">
        <Image alt="" aria-hidden="true" src="/img/login-bg.webp" />
      </div>
      <div className="public-section-form-wrapper">
        <div className="mb-6">
          <Heading1>Entrar</Heading1>
        </div>

        <LoginForm />

        <p className="mt-4 font-body-primary text-neutral-dogs-900/90">
          Não tem uma conta?{" "}
          <Link className="link-underline-blue" to="/signup">
            Crie uma!
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
