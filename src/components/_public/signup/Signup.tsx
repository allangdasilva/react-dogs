import Heading1 from "../../common/Heading1";
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
          <Heading1>Criar Conta</Heading1>
        </div>

        <SignupForm />
      </div>
    </section>
  );
};

export default Signup;
