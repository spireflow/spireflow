import React, { ReactNode } from "react";
import { ArrowDownSimpleIcon } from "../../assets/icons/ArrowDownSimpleIcon";
import { ExpandableDropdownSection } from "../../components/common/ExpandableDropdownSection";

interface DropdownMenuItemProps {
  icon: ReactNode;
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  icon,
  label,
  isOpen,
  onToggle,
  children,
}) => {
  return (
    <div>
      <div
        className="px-4 py-2 pr-5 pl-[1rem] flex hover:bg-dropdownBgHover cursor-pointer justify-between items-center"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <div className="w-5 flex justify-center items-center text-grayIcon mr-[0.8rem] stroke-grayIcon fill-grayIcon">
            {icon}
          </div>
          <span>{label}</span>
        </div>
        <div
          className={`text-secondaryText transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <ArrowDownSimpleIcon />
        </div>
      </div>
      {isOpen && (
        <ExpandableDropdownSection>{children}</ExpandableDropdownSection>
      )}
    </div>
  );
};
