import Heading1 from "../../../common/Heading1";
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
          <Heading1>Resetar Senha</Heading1>
        </div>

        <PasswordResetForm />
      </div>
    </section>
  );
};

export default PasswordReset;
