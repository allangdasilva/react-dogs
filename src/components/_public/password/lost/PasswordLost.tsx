import Heading1 from "../../../common/Heading1";
import Image from "../../../helper/Image";
import PasswordLostForm from "./PasswordLostForm";

const PasswordLost = () => {
  return (
    <section className="public-section-wrapper">
      <div className="public-section-background">
        <Image alt="" aria-hidden="true" src="/img/lost-bg.webp" />
      </div>
      <div className="public-section-form-wrapper">
        <div className="mb-6">
          <Heading1>Encontrar sua conta</Heading1>
        </div>

        <PasswordLostForm />
      </div>
    </section>
  );
};

export default PasswordLost;
