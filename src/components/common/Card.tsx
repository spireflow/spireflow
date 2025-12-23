import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  title?: string;
  customHeader?: ReactNode | boolean;
  hasSubtitle?: boolean;
  padding?: string;
  addTitleMargin?: boolean;
  isHeaderDividerVisible?: boolean;
};

export const Card = ({
  children,
  className,
  id,
  title,
  customHeader,
  hasSubtitle = false,
  padding = "px-6",
  addTitleMargin = false,
  isHeaderDividerVisible = false,
}: CardProps) => {
  return (
    <div
      id={id}
      className={`border light:shadow-lg border-cardBorder rounded-[12px] !border-cardBorder bg-primaryBg
                relative w-full text-left h-full pt-[1.35rem]  
                ${className} `}
    >
      {title && !customHeader && (
        <div
          className={`text-[0.9rem] w-full ${padding} 1xl:text-[1rem] 3xl:text-[1.2rem] font-semibold text-primaryText 
            ${addTitleMargin ? "mb-6" : ""}
            ${isHeaderDividerVisible ? "border-b border-cardBorder pb-4" : ""}
            `}
        >
          {title}
        </div>
      )}
      {customHeader && typeof customHeader !== "boolean" && (
        <div className={`w-full ${padding} ${hasSubtitle ? "mb-8" : ""}`}>
          {customHeader}
        </div>
      )}
      <div
        className={`w-full pb-6 max-h-full
      ${title || customHeader ? padding : ""}
      `}
      >
        {children}
      </div>
    </div>
  );
};
