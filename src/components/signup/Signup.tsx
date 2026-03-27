import SignupForm from "../../features/auth/components/SignupForm";
import PageTitle from "../PageTitle";

const Signup = () => {
  return (
    <section className="auth-wrapper sm:before:bg-[url(/img/signup-bg.jpg)]">
      <div className="auth-form-wrapper">
        <PageTitle>Criar Conta</PageTitle>

        <SignupForm />
      </div>
    </section>
  );
};

export default Signup;
