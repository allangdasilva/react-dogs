import TitleBase from "../../../common/TitleBase";
import Image from "../../../helper/Image";
import PasswordResetForm from "./PasswordResetForm";

const PasswordReset = () => {
  return (
    <section className="public-section-wrapper">
      <div className="public-section-background">
        <Image alt="" aria-hidden="true" src="/img/reset-bg.webp" />
      </div>
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
