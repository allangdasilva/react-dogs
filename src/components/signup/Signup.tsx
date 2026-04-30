import SignupForm from "../../features/auth/components/SignupForm";
import PageTitle from "../PageTitle";

const Signup = () => {
  return (
    <section className="public-section-wrapper">
      <div className="public-section-background bg-[url(img/signup-bg.jpg)]"></div>
      <div className="public-section-form-wrapper">
        <div className="mb-6">
          <PageTitle>Criar Conta</PageTitle>
        </div>

        <SignupForm />
      </div>
    </section>
  );
};

export default Signup;
