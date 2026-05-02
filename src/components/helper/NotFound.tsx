import { Link } from "@tanstack/react-router";
import TitleBase from "../common/TitleBase";

type Props = {
  children: React.ReactNode;
};

const NotFound = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <TitleBase>{children}</TitleBase>
      <p className="font-body-base text-base-700 max-w-prose">
        O link em que você clicou pode não estar funcionando, ou a página pode
        ter sido removida.{" "}
        <Link to="/" className="link-sm-underline-blue">
          Voltar para o site.
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
