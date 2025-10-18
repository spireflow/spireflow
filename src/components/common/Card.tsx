import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  title?: string;
  customHeader?: ReactNode | boolean;
  hasSubtitle?: boolean;
};

export const Card = ({
  children,
  className,
  id,
  title,
  customHeader,
  hasSubtitle = false,
}: CardProps) => {
  return (
    <div
      id={id}
      className={`border light:shadow-lg border-cardBorder rounded-[12px] !border-cardBorder bg-primaryBg
                relative w-full text-left h-full pt-[1.35rem]  
                ${className} `}
    >
      {title && !customHeader && (
        <div className="text-[0.9rem] w-full px-6 1xl:text-[1rem] 3xl:text-[1.2rem] font-semibold text-primaryText">
          {title}
        </div>
      )}
      {customHeader && typeof customHeader !== 'boolean' && (
        <div className={`w-full px-6 ${hasSubtitle ? "mb-8" : ""}`}>
          {customHeader}
        </div>
      )}
      <div
        className={`w-full pb-6 max-h-full
      ${title || customHeader ? "px-6" : ""}
      `}
      >
        {children}
      </div>
    </div>
  );
};
