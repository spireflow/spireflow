import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  title?: string;
  customHeader?: boolean;
};

export const Card = ({
  children,
  className,
  id,
  title,
  customHeader,
}: CardProps) => {
  return (
    <div
      id={id}
      className={`border light:shadow-lg border-cardBorder rounded-[12px] !border-cardBorder bg-primaryBg
                relative w-full text-left h-full pt-5  
                ${className} `}
    >
      {title && (
        <div className="text-[0.9rem] w-full px-6 border-b border-mainBorder pb-4 1xl:text-[1rem] 3xl:text-[1.2rem] font-semibold text-primaryText">
          {title}
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
