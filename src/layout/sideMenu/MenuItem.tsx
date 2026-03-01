"use client";

import { useEffect, useRef, useState } from "react";

import { useAppStore } from "../../store/appStore";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Link, usePathname } from "../../i18n/navigation";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../../components/common/shadcn/tooltip";
import { useIsFirstRender } from "../../hooks/useIsFirstRender";
import { MenuItemProps } from "./types";

export const MenuItem = ({ title, icon, path }: MenuItemProps) => {
  const toggleMobileMenu = useAppStore((state) => state.toggleMobileMenu);
  const isSideMenuOpen = useAppStore((state) => state.isSideMenuOpen);
  const currentPathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const [isActive, setIsActive] = useState(false);
  const [hasEnteredSinceCollapse, setHasEnteredSinceCollapse] = useState(false);
  const prevCollapsedRef = useRef(false);

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

    setIsActive(normalizedPathname === normalizedPath);
  }, [currentPathname, path]);

  // First render check needed to prevent hydration mismatch errors
  const isFirstRender = useIsFirstRender();
  if (isFirstRender) return null;

  const isCollapsed = !isSideMenuOpen && isDesktop;

  if (prevCollapsedRef.current !== isCollapsed) {
    prevCollapsedRef.current = isCollapsed;
    setHasEnteredSinceCollapse(false);
  }

  const showTooltip = isCollapsed && hasEnteredSinceCollapse;

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <Link
          href={path}
          onPointerEnter={() => {
            if (isCollapsed) setHasEnteredSinceCollapse(true);
          }}
          onPointerLeave={() => setHasEnteredSinceCollapse(false)}
          onFocus={() => {
            if (isCollapsed) setHasEnteredSinceCollapse(true);
          }}
          onBlur={() => setHasEnteredSinceCollapse(false)}
          className={`block rounded-[6px] focus-visible:outline-offset-[-2px] transition-[width,margin] duration-200 ${isCollapsed ? "mx-3" : "w-full"}`}
        >
          <div
            onClick={handleMenuItemClick}
            className={`flex relative rounded-[6px] items-center py-[0.5rem] 1xl:py-[0.55rem] 3xl:py-[0.7rem] mb-[1px] 1xl:mb-1 3xl:mb-2 transition-[background-color,border-color,padding] duration-200 ${
              isCollapsed ? "pl-[0.65rem]" : "pl-4 pr-2"
            } ${
              isActive
                ? "bg-navItemActiveBg hover:bg-navItemActiveBgHover border-l-2 border-transparent"
                : "bg-navItemBg hover:bg-navItemBgHover border-l-2 border-transparent"
            }`}
          >
            <div
              className={`menuItemIcon ${isCollapsed ? "" : "pr-3"} ${
                isActive
                  ? "stroke-mainColor fill-mainColor text-mainColor"
                  : "stroke-grayIcon fill-grayIcon text-grayIcon"
              }`}
            >
              {icon}
            </div>
            <div
              className={`text-xs xl:text-[12px] 3xl:text-[0.88rem] font-medium tracking-wide whitespace-nowrap overflow-hidden transition-[width,opacity] duration-200 ${
                isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              } ${isActive ? "text-navItemTextActive" : "text-navItemText"}`}
            >
              {title}
            </div>
          </div>
        </Link>
      </TooltipTrigger>
      {showTooltip && (
        <TooltipContent
          side="right"
          alignOffset={3}
          sideOffset={12}
          className="hidden xl:block"
        >
          {title}
        </TooltipContent>
      )}
    </Tooltip>
  );
};
