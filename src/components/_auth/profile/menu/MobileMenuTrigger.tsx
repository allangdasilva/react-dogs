import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import AnchorLabel from "../../../common/AnchorLabel";

const MobileMenuTrigger = () => {
  return (
    <DropdownMenu.Trigger asChild>
      <button
        type="button"
        className="bg-interactive-200 flex flex-col items-center px-4 py-2 rounded-base whitespace-nowrap cursor-pointer group data-[state=open]:bg-primary-500 data-[state=open]:hover:bg-primary-600 transition-colors-no-outline data-[state=open]:*:text-[#1b1a18]"
        aria-label="Abrir menu de navegação"
      >
        <div className="w-6 h-6 flex flex-col gap-0.75 items-center justify-center pointer-events-none *:w-full *:max-w-4.5 *:h-0.5 *:rounded-full *:bg-neutral-dogs-900 *:transition-transform *:ease-in group-data-[state=open]:*:bg-[#1b1a18]">
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
