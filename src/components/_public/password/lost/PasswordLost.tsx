import PageTitle from "../../../PageTitle";
import PasswordLostForm from "./PasswordLostForm";

const PasswordLost = () => {
  return (
    <section className="public-section-wrapper">
      <div className="public-section-background bg-[url(/img/login-bg.jpg)]"></div>
      <div className="public-section-form-wrapper">
        <div className="mb-6">
          <PageTitle>Encontrar conta</PageTitle>
        </div>

        <PasswordLostForm />
      </div>
    </section>
  );
};

export default PasswordLost;
