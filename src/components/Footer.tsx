import AnchorRouter from "./common/AnchorRouter";
import LogoIcon from "./svgs/LogoIcon";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center gap-4 py-8 bg-neutral-dogs-100 border-t border-neutral-dogs-200">
      <AnchorRouter to="/" className="flex justify-center min-h-13 group">
        <LogoIcon />
      </AnchorRouter>
      <p className="font-body-primary text-neutral-dogs-900/90">
        &copy; 2026 Dogs from Allan
      </p>
    </footer>
  );
};

export default Footer;
