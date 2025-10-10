"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useAppStore } from "../../store/appStore";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Link } from "../../i18n/navigation";
import { useTooltip } from "../../hooks/useTooltip";
import { Tooltip } from "../../components/common/Tooltip";
import { useIsFirstRender } from "../../hooks/useIsFirstRender";
import { MenuItemProps } from "./types";
import { outfit } from "../../styles/fonts";

export const MenuItem = ({ title, icon, path }: MenuItemProps) => {
  const toggleMobileMenu = useAppStore((state) => state.toggleMobileMenu);
  const { isSideMenuOpen } = useAppStore();
  const currentPathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const [isActive, setIsActive] = useState(false);
  const { isTooltipVisible, showTooltip, hideTooltip } = useTooltip();

  const handleMenuItemClick = () => {
    if (window.innerWidth < 1024) {
      toggleMobileMenu();
    }
  };

  useEffect(() => {
    // Handling active path is inside useEffect, because otherwise it won't work if it's prerendered as static HTML (SSG)
    const normalizedPathname = currentPathname?.endsWith("/")
      ? currentPathname.slice(0, -1)
      : currentPathname;
    const normalizedPath = path.endsWith("/") ? path.slice(0, -1) : path;
    const plPath = `/pl${normalizedPath}`;

    if (normalizedPath === "/") {
      setIsActive(normalizedPathname === "/" || normalizedPathname === "/pl");
    } else {
      setIsActive(
        normalizedPathname === normalizedPath || normalizedPathname === plPath
      );
    }
  }, [currentPathname, path]);

  // First render check needed to prevent hydration mismatch errors
  const isFirstRender = useIsFirstRender();
  if (isFirstRender) return null;

  return (
    <Link
      href={path}
      className={`${
        !isSideMenuOpen || !isDesktop
          ? "flex flex-col justify-center w-full py-0 items-center"
          : ""
      }`}
    >
      <div
        onClick={handleMenuItemClick}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className={`
         flex relative rounded-md items-center py-[0.5rem] 1xl:py-[0.55rem] 3xl:py-[0.7rem]  pl-4 mb-[1px] 1xl:mb-1 3xl:mb-2 w-full pr-2  transition ${
           isActive
             ? "bg-navItemActiveBg hover:bg-navItemActiveBgHover hover:bg-navItemActiveBgHover border-l-2 border-transparent"
             : "bg-navItemBg hover:bg-navItemBgHover hover:bg-navItemBgHover border-l-2 border-transparent"
         }
         ${
           !isSideMenuOpen &&
           isDesktop &&
           "!pl-1 pl-8  justify-center items-center !w-10 rounded-full"
         }    
        `}
      >
        <div
          className={`menuItemIcon pr-3 ${
            isActive
              ? "stroke-mainColor fill-mainColor text-mainColor text-mainColor"
              : "stroke-gray-400 fill-gray-400 text-gray-400 text-gray-400"
          }
        ${!isSideMenuOpen && isDesktop && "pl-4"}
         `}
        >
          {icon}
        </div>
        {(isSideMenuOpen || !isDesktop) && (
          <div
            className={`text-xs xl:text-[12px] 3xl:text-[0.88rem] font-normal tracking-wide ${
              outfit.className
            }  ${
              isActive
                ? "text-navItemTextActive text-navItemTextActive"
                : "text-navItemText text-navItemText"
            }        
          `}
          >
            {title}
          </div>
        )}
        {isTooltipVisible && !isSideMenuOpen && (
          <div className={`absolute top-0 left-12 hidden xl:flex `}>
            <Tooltip text={title} className="h-8 px-3" />
          </div>
        )}
      </div>
    </Link>
  );
};
