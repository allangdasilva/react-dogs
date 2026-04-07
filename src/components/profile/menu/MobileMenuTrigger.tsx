import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import AnchorLabel from "../../AnchorLabel";

const MobileMenuTrigger = () => {
  return (
    <DropdownMenu.Trigger asChild>
      <button
        className="anchor-bg-200 flex flex-col items-center px-4 py-2 rounded-base whitespace-nowrap cursor-pointer group data-[state=open]:bg-primary data-[state=open]:hover:bg-primary-dark transition-colors ease-in"
        aria-label="Opções do usuário"
      >
        <div className="w-6 h-6 flex flex-col gap-0.75 items-center justify-center pointer-events-none *:w-full *:max-w-4.5 *:h-0.5 *:rounded-full *:bg-base-700 *:transition-transform *:ease-in">
          <div className="group-data-[state=open]:-translate-x-0.5"></div>
          <div className="group-data-[state=open]:translate-x-0.5"></div>
          <div className="group-data-[state=open]:-translate-x-0.5"></div>
        </div>
        <AnchorLabel>Menu</AnchorLabel>
      </button>
    </DropdownMenu.Trigger>
  );
};

export default MobileMenuTrigger;
