import { Link } from "@tanstack/react-router";
import Heading1 from "../common/Heading1";

type Props = {
  children: string;
};

const NotFound = ({ children }: Props) => {
  return (
    <div className="error-not-found-wrapper">
      <Heading1>{children}</Heading1>
      <div className="max-w-prose">
        <p className="paragraph-inline-700">
          O link em que você clicou pode não estar funcionando, ou a página pode
          ter sido removida.{" "}
        </p>
        <Link to="/" className="font-body-primary link-underline-blue">
          Voltar para o site.
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
