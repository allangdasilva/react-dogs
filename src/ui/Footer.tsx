import AnchorRouter from "./AnchorRouter";
import LogoIcon from "./svgs/LogoIcon";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center gap-3 py-12 bg-primary">
      <AnchorRouter
        to="/"
        className="inline-block hover:bg-primary-dark focus:bg-primary-dark"
      >
        <LogoIcon />
      </AnchorRouter>
      <p className="font-body-xs text-base-700">&copy; 2026 Dogs from Allan</p>
    </footer>
  );
};

export default Footer;
