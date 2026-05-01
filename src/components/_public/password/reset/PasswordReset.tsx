import PageTitle from "../../../PageTitle";
import PasswordResetForm from "./PasswordResetForm";

const PasswordReset = () => {
  return (
    <section className="public-section-wrapper">
      <div className="public-section-background bg-[url(/img/signup-bg.jpg)]"></div>
      <div className="public-section-form-wrapper">
        <div className="mb-6">
          <PageTitle>Resetar Senha</PageTitle>
        </div>

        <PasswordResetForm />
      </div>
    </section>
  );
};

export default PasswordReset;
