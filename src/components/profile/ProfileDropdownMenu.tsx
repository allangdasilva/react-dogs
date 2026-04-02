import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link } from "@tanstack/react-router";
import PostsIcon from "../svgs/PostsIcon";
import AddIcon from "../svgs/AddIcon";
import StatsIcon from "../svgs/StatsIcon";
import ExitIcon from "../svgs/ExitIcon";

const ProfileDropdownMenu = () => {
  return (
    <nav className="sm:hidden">
      <DropdownMenu.Root modal={false}>
        {/* Trigger: O gatilho. É o botão que o usuário clica. */}
        {/* 
          Por padrão, o Radix renderiza sua própria tag (geralmente um button ou div). Quando você usa asChild, você está dizendo: "Radix, não crie uma tag nova. Pegue toda a sua lógica (eventos de clique, acessibilidade, refs) e aplique-a diretamente no meu componente filho". 
        */}
        <DropdownMenu.Trigger asChild>
          <button className="IconButton" aria-label="Opções do usuário">
            Menu
          </button>
        </DropdownMenu.Trigger>

        {/* 
          Portal: joga o elemento no final da árvore DOM (facilitando para que o modal esteja acima dos outros elementos)
        */}
        <DropdownMenu.Portal>
          {/* Content: É ocomponente que aparece quando o menu está aberto. */}
          <DropdownMenu.Content
            sideOffset={12} // sideOffset={12} Distância entre o botão e o menu
            className="flex flex-col min-w-70 gap-3 p-3 rounded-base bg-base-200 shadow-sm sm:hidden"
          >
            {/* Item: É o componente que contém os itens do menu */}
            <DropdownMenu.Item asChild>
              <Link className="flex gap-3" to="/profile">
                <PostsIcon />
                <span>Perfil</span>
              </Link>
            </DropdownMenu.Item>

            <hr className="1px text-base-300" />

            <DropdownMenu.Item asChild>
              <Link className="flex gap-3" to="/profile/post">
                <AddIcon />
                <span>Criar</span>
              </Link>
            </DropdownMenu.Item>

            <hr className="1px text-base-300" />

            <DropdownMenu.Item asChild>
              <Link className="flex gap-3" to="/profile/statistics">
                <StatsIcon />
                <span>Dados</span>
              </Link>
            </DropdownMenu.Item>

            <hr className="1px text-base-300" />

            <DropdownMenu.Item asChild>
              <button className="flex gap-3">
                <ExitIcon />
                <span>Sair</span>
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </nav>
  );
};

export default ProfileDropdownMenu;
