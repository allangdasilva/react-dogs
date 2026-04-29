import clsx from "clsx";
import SignupForm from "../../features/auth/components/SignupForm";
import PageTitle from "../PageTitle";

const Signup = () => {
  return (
    <section className="grid sm:grid-cols-2 sm:gap-4">
      <div className="hidden pointer-events-none sm:block">
        <div className="absolute inset-0 grid grid-cols-2 gap-4 pt-19">
          <div className="bg-center bg-cover bg-[url(img/signup-bg.jpg)]"></div>
        </div>
      </div>
      <div
        className={clsx("flex flex-col items-center sm:items-stretch", {
          "opacity-60": false,
        })}
      >
        <div className="mb-6">
          <PageTitle>Criar Conta</PageTitle>
        </div>

        <SignupForm />
      </div>
    </section>
  );
};

export default Signup;
