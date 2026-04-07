import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";

type Props = {
  to?: string;
  className?: string;
  icon: ReactNode;
  label: string;
  onClick?: () => void;
};

const MobileMenuItem = ({ to, icon, label }: Props) => {
  const content = (
    <div className="flex gap-3">
      {icon}
      <span>{label}</span>
    </div>
  );

  return (
    <DropdownMenu.Item asChild>
      {to ? (
        <Link className="group" to={to}>
          {content}
        </Link>
      ) : (
        <button className="cursor-pointer group" type="button">
          {content}
        </button>
      )}
    </DropdownMenu.Item>
  );
};

export default MobileMenuItem;
