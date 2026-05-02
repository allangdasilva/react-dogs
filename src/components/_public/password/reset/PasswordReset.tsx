import TitleBase from "../../../common/TitleBase";
import PasswordResetForm from "./PasswordResetForm";

const PasswordReset = () => {
  return (
    <section className="public-section-wrapper">
      <div className="public-section-background bg-[url(/img/reset-bg.webp)]"></div>
      <div className="public-section-form-wrapper">
        <div className="mb-6">
          <TitleBase>Resetar Senha</TitleBase>
        </div>

        <PasswordResetForm />
      </div>
    </section>
  );
};

export default PasswordReset;
