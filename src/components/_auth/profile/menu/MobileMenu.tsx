import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Spacer from "../../../common/Spacer";
import PostsIcon from "../../../svgs/PostsIcon";
import AddIcon from "../../../svgs/AddIcon";
import ExitIcon from "../../../svgs/ExitIcon";
import MobileMenuItem from "./MobileMenuItem";
import MobileMenuTrigger from "./MobileMenuTrigger";

const MobileMenu = () => {
  return (
    <nav className="sm:hidden">
      <DropdownMenu.Root modal={false}>
        {/* Trigger(é que aqui eu criei um componente reutilizável, mas é esse o significado): O gatilho. É o botão que o usuário clica. */}
        {/* 
          Por padrão, o Radix renderiza sua própria tag (geralmente um button ou div). Quando você usa asChild, você está dizendo: "Radix, não crie uma tag nova. Pegue toda a sua lógica (eventos de clique, acessibilidade, refs) e aplique-a diretamente no meu componente filho". 
        */}
        <MobileMenuTrigger />

        {/* 
          Portal: joga o elemento no final da árvore DOM (facilitando para que o modal esteja acima dos outros elementos)
        */}
        <DropdownMenu.Portal>
          {/* Content: É ocomponente que aparece quando o menu está aberto. */}
          <DropdownMenu.Content
            side="bottom"
            sideOffset={12} // sideOffset={12} Distância entre o botão e o menu
            collisionPadding={16}
            className="flex flex-col min-w-48 gap-2 py-3 px-4 rounded-base bg-base-200 z-50 shadow-lg will-change-auto data-[state=open]:animate-modal-in data-[state=closed]:animate-modal-out sm:hidden"
          >
            {/* Item(é que aqui eu criei um componente reutilizável, mas é esse o significado): É o componente que contém os itens do menu */}
            <MobileMenuItem icon={<PostsIcon />} label="Posts" to="/profile" />
            <Spacer className="bg-base-300" />

            <MobileMenuItem
              icon={<AddIcon />}
              label="Criar"
              to="/profile/create"
            />
            <Spacer className="bg-base-300" />

            <MobileMenuItem icon={<ExitIcon />} label="Sair" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </nav>
  );
};

export default MobileMenu;
