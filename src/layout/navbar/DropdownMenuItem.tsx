import { ReactNode, Children } from "react";
import { ArrowDownSimpleIcon } from "../../assets/icons/ArrowDownSimpleIcon";

interface ExpandableDropdownSectionProps {
  children: ReactNode;
}

const ExpandableDropdownSection = ({
  children,
}: ExpandableDropdownSectionProps) => {
  const childArray = Children.toArray(children);
  const lastIndex = childArray.length - 1;

  return (
    <div className="bg-dropdownBg relative" role="menu">
      <div className="ml-[2.4rem] pl-[0.8rem]">
        {childArray.map((child, index) => {
          const isLast = index === lastIndex;
          return (
            <div key={index} className="relative">
              {isLast ? (
                <div className="absolute left-[-1.6rem] top-0 h-1/2 w-[calc(0.75rem+2px)] border-l-2 border-b-2 border-mainBorder rounded-bl-[5px] z-10 pointer-events-none" />
              ) : (
                <>
                  <div className="absolute left-[-1.6rem] top-0 bottom-0 w-[2px] bg-mainBorder z-10 pointer-events-none" />
                  <div className="absolute left-[calc(-1.6rem+2px)] top-1/2 w-[0.75rem] h-[2px] bg-mainBorder z-10 pointer-events-none" />
                </>
              )}
              {child}
            </div>
          );
        })}
      </div>
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
