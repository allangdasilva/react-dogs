import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../../../features/auth/store/auth.store";

type Props = {
  to?: string;
  className?: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
};

const MobileMenuItem = ({ to, icon, label }: Props) => {
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    queryClient.clear();
    navigate({ to: "/" });
  }

  const content = (
    <div className="flex gap-3">
      {icon}
      <span>{label}</span>
    </div>
  );

  return (
    <DropdownMenu.Item asChild>
      {to ? (
        <Link
          activeProps={{
            // O atributo aria-current="page" é uma propriedade de acessibilidade (WAI-ARIA) usada no HTML para indicar, programaticamente, qual link em um menu de navegação ou paginação representa a página atual. Ele informa a tecnologias assistivas, como leitores de tela, onde o usuário está, sem depender apenas de dicas visuais.
            // Valor 'page': Indica que o item representa a página atual dentro de um conjunto.
            // Dinamicamente: Se você usa frameworks como React, Vue ou Next.js, você configura uma lógica para que o atributo apareça apenas quando a rota ativa coincidir com o href do link. Ou seja, esse aria-current: page só vai aparecer para o link que estiver ativo no momento
            // O tanstack router já adiciona esse atributo automaticamente, mas nesse caso aqui eu tive que colocar manualmente porque o post estava ficando como ativa sempre, então adicionei o atributo e coloquei o exact também
            "aria-current": "page",
          }}
          activeOptions={{ exact: true }}
          className="group"
          to={to}
        >
          {content}
        </Link>
      ) : (
        <button
          onClick={handleLogout}
          className="cursor-pointer group"
          type="button"
        >
          {content}
        </button>
      )}
    </DropdownMenu.Item>
  );
};

export default MobileMenuItem;
