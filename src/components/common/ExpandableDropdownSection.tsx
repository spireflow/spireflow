import React from "react";

interface ExpandableDropdownSectionProps {
  children: React.ReactNode;
}

export const ExpandableDropdownSection: React.FC<
  ExpandableDropdownSectionProps
> = ({ children }) => {
  return (
    <div className="bg-dropdownBg relative">
      <div
        className="absolute left-[1.6rem] top-0 bottom-0 w-[2px] bg-mainBorder"
        style={{ height: "calc(100% - 1rem)" }}
      ></div>
      <div className="ml-[2.4rem] pl-[0.8rem]">{children}</div>
    </div>
  );
};
