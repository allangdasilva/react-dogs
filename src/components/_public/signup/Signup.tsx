import TitleBase from "../../common/TitleBase";
import Image from "../../helper/Image";
import SignupForm from "./SignupForm";

const Signup = () => {
  return (
    <section className="public-section-wrapper">
      <div className="public-section-background">
        <Image alt="" aria-hidden="true" src="/img/signup-bg.webp" />
      </div>
      <div className="public-section-form-wrapper">
        <div className="mb-6">
          <TitleBase>Criar Conta</TitleBase>
        </div>

        <SignupForm />
      </div>
    </section>
  );
};

export default Signup;
