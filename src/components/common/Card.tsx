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

/**
 * Reusable card container component with optional title and custom header.
 * Provides consistent styling with border, shadow, and rounded corners.
 * Used throughout the application for grouping related content.
 *
 * @component
 * @param {ReactNode} children - Card body content
 * @param {string} [className] - Additional styling classes
 * @param {string} [id] - Element identifier
 * @param {string} [title] - Optional title displayed in header
 * @param {ReactNode|boolean} [customHeader] - Custom header content
 * @param {boolean} [hasSubtitle=false] - Adds spacing for subtitle
 * @param {string} [padding='px-6'] - Custom padding
 * @param {boolean} [addTitleMargin=false] - Extra margin below title
 * @param {boolean} [isHeaderDividerVisible=false] - Divider line under header
 *
 * @example
 * ```tsx
 * <Card title="Statistics" addTitleMargin>
 *   <p>Card content here</p>
 * </Card>
 * ```
 */
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
      className={`border light:shadow-lg border-cardBorder rounded-xl !border-cardBorder bg-primaryBg
                relative w-full text-left h-full pt-[1.35rem]  
                ${className} `}
    >
      {title && !customHeader && (
        <h3
          className={`text-sm w-full ${padding} 1xl:text-base 3xl:text-lg font-semibold text-primaryText
            ${addTitleMargin ? "mb-6" : ""}
            ${isHeaderDividerVisible ? "border-b border-cardBorder pb-4" : ""}
            `}
        >
          {title}
        </h3>
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
