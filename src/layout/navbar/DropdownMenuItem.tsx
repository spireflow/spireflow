import { ReactNode } from "react";
import { ArrowDownSimpleIcon } from "../../assets/icons/ArrowDownSimpleIcon";

interface ExpandableDropdownSectionProps {
  children: ReactNode;
}

const ExpandableDropdownSection = ({
  children,
}: ExpandableDropdownSectionProps) => {
  return (
    <div className="bg-dropdownBg relative" role="menu">
      <div
        className="absolute left-[1.6rem] top-0 bottom-0 w-[2px] bg-mainBorder"
        style={{ height: "calc(100% - 1rem)" }}
      ></div>
      <div className="ml-[2.4rem] pl-[0.8rem]">{children}</div>
    </div>
  );
};

interface DropdownMenuItemProps {
  icon: ReactNode;
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export const DropdownMenuItem = ({
  icon,
  label,
  isOpen,
  onToggle,
  children,
}: DropdownMenuItemProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
    if (e.key === "ArrowRight" && !isOpen) {
      e.preventDefault();
      onToggle();
    }
    if (e.key === "ArrowLeft" && isOpen) {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div role="none">
      <div
        className="px-4 py-2 pr-5 pl-[1rem] flex hover:bg-dropdownBgHover cursor-pointer justify-between items-center focus-visible:bg-dropdownBgHover"
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={isOpen}
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
