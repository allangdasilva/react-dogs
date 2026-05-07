import { Link } from "@tanstack/react-router";
import TitleBase from "../common/TitleBase";

type Props = {
  children: React.ReactNode;
};

const NotFound = ({ children }: Props) => {
  return (
    <div className="error-not-found-wrapper">
      <TitleBase>{children}</TitleBase>
      <div className="max-w-prose">
        <p className="paragraph-inline-700">
          O link em que você clicou pode não estar funcionando, ou a página pode
          ter sido removida.{" "}
        </p>
        <Link to="/" className="font-body-base link-sm-underline-blue">
          Voltar para o site.
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
