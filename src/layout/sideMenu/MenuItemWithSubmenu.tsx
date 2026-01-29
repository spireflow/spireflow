"use client";

import { useState, useEffect, ReactElement, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

import { useAppStore } from "../../store/appStore";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Link } from "../../i18n/navigation";
import { useIsFirstRender } from "../../hooks/useIsFirstRender";
import { ChevronDownIcon } from "../../assets/icons/ChevronDownIcon";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../components/common/shadcn/dropdown-menu";

interface SubmenuItem {
  title: string;
  path: string;
  newTab?: boolean;
}

interface MenuItemWithSubmenuProps {
  title: string;
  icon: ReactElement;
  submenuItems: SubmenuItem[];
}

export const MenuItemWithSubmenu = ({
  title,
  icon,
  submenuItems,
}: MenuItemWithSubmenuProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [focusedSubmenuIndex, setFocusedSubmenuIndex] = useState(-1);
  const toggleMobileMenu = useAppStore((state) => state.toggleMobileMenu);
  const isSideMenuOpen = useAppStore((state) => state.isSideMenuOpen);
  const currentPathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const [activeSubmenuPath, setActiveSubmenuPath] = useState<string | null>(
    null
  );
  const submenuRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const normalizedPathname = currentPathname?.endsWith("/")
      ? currentPathname.slice(0, -1)
      : currentPathname;

    // Check if any submenu item is active
    const activeItem = submenuItems.find((item) => {
      const normalizedPath = item.path.endsWith("/")
        ? item.path.slice(0, -1)
        : item.path;
      const plPath = `/pl${normalizedPath}`;
      return (
        normalizedPathname === normalizedPath || normalizedPathname === plPath
      );
    });

    if (activeItem) {
      setActiveSubmenuPath(activeItem.path);
      setIsExpanded(true);
    } else {
      setActiveSubmenuPath(null);
    }
  }, [currentPathname, submenuItems]);

  const handleMenuItemClick = () => {
    if (window.innerWidth < 1024) {
      toggleMobileMenu();
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const isCollapsed = !isSideMenuOpen && isDesktop;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isCollapsed) return;

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!isExpanded) {
          setIsExpanded(true);
          setFocusedSubmenuIndex(0);
          setTimeout(() => submenuRefs.current[0]?.focus(), 0);
        } else {
          setIsExpanded(false);
          setFocusedSubmenuIndex(-1);
        }
      } else if (e.key === "ArrowDown" && isExpanded) {
        e.preventDefault();
        const nextIndex = Math.min(focusedSubmenuIndex + 1, submenuItems.length - 1);
        setFocusedSubmenuIndex(nextIndex);
        submenuRefs.current[nextIndex]?.focus();
      } else if (e.key === "ArrowUp" && isExpanded) {
        e.preventDefault();
        const prevIndex = Math.max(focusedSubmenuIndex - 1, 0);
        setFocusedSubmenuIndex(prevIndex);
        submenuRefs.current[prevIndex]?.focus();
      } else if (e.key === "Escape" && isExpanded) {
        e.preventDefault();
        setIsExpanded(false);
        setFocusedSubmenuIndex(-1);
      }
    },
    [isExpanded, focusedSubmenuIndex, submenuItems.length, isCollapsed]
  );

  const isFirstRender = useIsFirstRender();
  if (isFirstRender) return null;

  const isAnySubmenuActive = activeSubmenuPath !== null;

  
  const sharedClassName = `flex relative rounded-[6px] items-center py-[0.5rem] 1xl:py-[0.55rem] 3xl:py-[0.7rem] mb-[1px] 1xl:mb-1 3xl:mb-2 cursor-pointer transition-all duration-200 ${
    isCollapsed ? "ml-[0.75rem] mr-[0.85rem] pl-[0.6rem]" : "w-full pl-4 pr-2"
  } ${
    isAnySubmenuActive
      ? "bg-navItemActiveBg hover:bg-navItemActiveBgHover border-l-2 border-transparent"
      : "bg-navItemBg hover:bg-navItemBgHover border-l-2 border-transparent"
  }`;

  const iconContent = (
    <div
      className={`menuItemIcon pr-3 ${
        isAnySubmenuActive
          ? "stroke-mainColor fill-mainColor text-mainColor"
          : "stroke-grayIcon fill-grayIcon text-grayIcon"
      }`}
    >
      {icon}
    </div>
  );

  const mainContent = (
    <div
      ref={triggerRef}
      onClick={!isCollapsed ? handleToggle : undefined}
      onKeyDown={!isCollapsed ? handleKeyDown : undefined}
      tabIndex={0}
      role={!isCollapsed ? "button" : undefined}
      aria-expanded={!isCollapsed ? isExpanded : undefined}
      className={sharedClassName}
    >
      {iconContent}
      <div
        className={`text-xs xl:text-[12px] 3xl:text-[0.88rem] font-medium tracking-wide whitespace-nowrap overflow-hidden transition-all duration-200 ${
          isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
        } ${
          isAnySubmenuActive ? "text-navItemTextActive" : "text-navItemText"
        }`}
      >
        {title}
      </div>
      <div
        className={`ml-auto transition-all duration-200 ${
          isExpanded ? "rotate-180" : "rotate-0"
        } ${
          isCollapsed ? "w-0 opacity-0 overflow-hidden" : "opacity-100"
        } stroke-grayIcon text-grayIcon`}
      >
        <ChevronDownIcon />
      </div>
    </div>
  );

  return (
    <div className={isCollapsed ? "" : "w-full"}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={!isCollapsed}>
          <div>{mainContent}</div>
        </DropdownMenuTrigger>
        {isCollapsed && (
          <DropdownMenuContent side="right" align="start" sideOffset={-4} className="min-w-[140px]" onCloseAutoFocus={() => triggerRef.current?.focus()}>
            {submenuItems.map((item) => (
              <DropdownMenuItem key={item.path} asChild>
                <Link
                  href={item.path}
                  target={item.newTab ? "_blank" : undefined}
                  onClick={handleMenuItemClick}
                  className="w-full"
                >
                  {item.title}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        )}
      </DropdownMenu>
      {!isCollapsed && isExpanded && (isSideMenuOpen || !isDesktop) && (
            <div className="ml-[1.6rem] relative">
              <div
                className="absolute left-0 top-0 w-[2px] bg-cardBorder"
                style={{ height: "calc(100% - 0.8rem)" }}
              ></div>
              {submenuItems.map((item, index) => {
                const normalizedPathname = currentPathname?.endsWith("/")
                  ? currentPathname.slice(0, -1)
                  : currentPathname;
                const normalizedPath = item.path.endsWith("/")
                  ? item.path.slice(0, -1)
                  : item.path;
                const plPath = `/pl${normalizedPath}`;
                const isActive =
                  normalizedPathname === normalizedPath ||
                  normalizedPathname === plPath;

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    target={item.newTab ? "_blank" : undefined}
                    ref={(el) => { submenuRefs.current[index] = el; }}
                    className="block mb-[1px] 1xl:mb-1 3xl:mb-2 -ml-[1.6rem] w-[calc(100%+1.6rem)] rounded-md"
                  >
                    <div
                      onClick={handleMenuItemClick}
                      className={`flex rounded-md items-center py-[0.4rem] 1xl:py-[0.45rem] 3xl:py-[0.6rem] pl-[3.2rem] w-full pr-2 transition ${
                        isActive
                          ? "bg-navItemActiveBg hover:bg-navItemActiveBgHover"
                          : "bg-navItemBg hover:bg-navItemBgHover"
                      }`}
                    >
                      <div
                        className={`text-xs xl:text-[11px] 3xl:text-[0.82rem] font-medium tracking-wide ${
                          isActive
                            ? "text-navItemTextActive"
                            : "text-navItemText"
                        }`}
                      >
                        {item.title}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
    </div>
  );
};
