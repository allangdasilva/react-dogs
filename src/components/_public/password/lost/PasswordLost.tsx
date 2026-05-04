import TitleBase from "../../../common/TitleBase";
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
          <TitleBase>Encontrar conta</TitleBase>
        </div>

        <PasswordLostForm />
      </div>
    </section>
  );
};

export default PasswordLost;
