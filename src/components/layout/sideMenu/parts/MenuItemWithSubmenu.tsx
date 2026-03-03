"use client";

import { ReactElement, useCallback, useEffect, useRef, useState } from "react";

import { ChevronDownIcon } from "../../../../assets/icons/ChevronDownIcon";
import { useIsFirstRender } from "../../../../hooks/useIsFirstRender";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { Link, usePathname } from "../../../../i18n/navigation";
import { useAppStore } from "../../../../store/appStore";
import { BREAKPOINTS } from "../../../../styles/breakpoints";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../common/shadcn/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../common/shadcn/tooltip";

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
    null,
  );
  const submenuRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const triggerRef = useRef<HTMLDivElement>(null);
  const verticalLineRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasEnteredSinceCollapse, setHasEnteredSinceCollapse] = useState(false);
  const prevCollapsedRef = useRef(false);

  /**
   * Syncs active submenu highlight and auto-expands the group
   * when the current route matches a submenu item (trailing-slash agnostic).
   */
  useEffect(() => {
    const normalizedPathname = currentPathname?.endsWith("/")
      ? currentPathname.slice(0, -1)
      : currentPathname;

    /** Check if any submenu item is active */
    const activeItem = submenuItems.find((item) => {
      const normalizedPath = item.path.endsWith("/")
        ? item.path.slice(0, -1)
        : item.path;
      return normalizedPathname === normalizedPath;
    });

    if (activeItem) {
      setActiveSubmenuPath(activeItem.path);
      setIsExpanded(true);
    } else {
      setActiveSubmenuPath(null);
    }
  }, [currentPathname, submenuItems]);

  /**
   * Dynamically sizes the vertical connector line to end at the center
   * of the last submenu item. Recalculates on resize.
   */
  useEffect(() => {
    const updateLineHeight = () => {
      if (!verticalLineRef.current) return;
      const line = verticalLineRef.current;
      const container = line.parentElement;
      if (!container) return;
      const lastItem = submenuRefs.current[submenuItems.length - 1];
      if (!lastItem) return;
      const containerTop = container.getBoundingClientRect().top;
      const lastItemRect = lastItem.getBoundingClientRect();
      const height = lastItemRect.top + lastItemRect.height / 2 - containerTop;
      line.style.height = `${height}px`;
    };

    if (!isExpanded) return;
    updateLineHeight();
    window.addEventListener("resize", updateLineHeight);
    return () => window.removeEventListener("resize", updateLineHeight);
  }, [isExpanded, submenuItems.length, isSideMenuOpen]);

  const handleMenuItemClick = () => {
    if (window.innerWidth < BREAKPOINTS.lg) {
      toggleMobileMenu();
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const isCollapsed = !isSideMenuOpen && isDesktop;

  useEffect(() => {
    if (!isCollapsed) setIsDropdownOpen(false);
  }, [isCollapsed]);

  if (prevCollapsedRef.current !== isCollapsed) {
    prevCollapsedRef.current = isCollapsed;
    setHasEnteredSinceCollapse(false);
  }

  /**
   * Keyboard navigation for submenu toggle and traversal. Enter/Space toggles,
   * arrows move focus, Escape closes. setTimeout defers focus until React commits.
   */
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
        const nextIndex = Math.min(
          focusedSubmenuIndex + 1,
          submenuItems.length - 1,
        );
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
    [isExpanded, focusedSubmenuIndex, submenuItems.length, isCollapsed],
  );

  const isFirstRender = useIsFirstRender();
  if (isFirstRender) return null;

  const isAnySubmenuActive = activeSubmenuPath !== null;

  const showTooltip = isCollapsed && hasEnteredSinceCollapse && !isDropdownOpen;

  const sharedClassName = `flex relative rounded-md items-center py-2 1xl:py-[0.55rem] 3xl:py-[0.7rem] mb-px 1xl:mb-1 3xl:mb-2 cursor-pointer transition-[background-color,border-color,padding,margin,width] duration-200 ${
    isCollapsed ? "mx-3 pl-[0.65rem]" : "w-full pl-4 pr-2"
  } ${
    isAnySubmenuActive
      ? "bg-navItemActiveBg hover:bg-navItemActiveBgHover border-l-2 border-transparent"
      : "bg-navItemBg hover:bg-navItemBgHover border-l-2 border-transparent"
  }`;

  const iconContent = (
    <div
      className={`menuItemIcon ${isCollapsed ? "" : "pr-3"} ${
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
      className={`${sharedClassName} focus-visible:outline-offset-[-2px]`}
    >
      {iconContent}
      <div
        className={`text-xs xl:text-xs 3xl:text-sm font-medium tracking-wide whitespace-nowrap overflow-hidden transition-[width,opacity] duration-200 ${
          isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
        } ${
          isAnySubmenuActive ? "text-navItemTextActive" : "text-navItemText"
        }`}
      >
        {title}
      </div>
      <div
        className={`ml-auto transition-[transform,opacity,width] duration-200 ${
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
    <div
      className={isCollapsed ? "" : "w-full"}
      onPointerEnter={() => {
        if (isCollapsed) setHasEnteredSinceCollapse(true);
      }}
      onPointerLeave={() => setHasEnteredSinceCollapse(false)}
      onFocus={() => {
        if (isCollapsed) setHasEnteredSinceCollapse(true);
      }}
      onBlur={() => setHasEnteredSinceCollapse(false)}
    >
      <Tooltip delayDuration={200} open={isDropdownOpen ? false : undefined}>
        <DropdownMenu
          open={isCollapsed && isDropdownOpen}
          onOpenChange={(open) => {
            setIsDropdownOpen(open);
            if (!open) setHasEnteredSinceCollapse(false);
          }}
        >
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild disabled={!isCollapsed}>
              <div>{mainContent}</div>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          {isCollapsed && (
            <DropdownMenuContent
              side="right"
              align="start"
              sideOffset={-4}
              className="min-w-35"
              onPointerDownOutside={(e) => {
                e.preventDefault();
                setIsDropdownOpen(false);
              }}
              onFocusOutside={(e) => e.preventDefault()}
              onCloseAutoFocus={(e) => e.preventDefault()}
              onEscapeKeyDown={() =>
                requestAnimationFrame(() => triggerRef.current?.focus())
              }
            >
              {submenuItems.map((item) => {
                const isItemActive = activeSubmenuPath === item.path;
                return (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link
                      href={item.path}
                      target={item.newTab ? "_blank" : undefined}
                      onClick={handleMenuItemClick}
                      className={`w-full ${isItemActive ? "bg-navItemActiveBg hover:bg-navItemActiveBgHover focus:bg-navItemActiveBgHover text-navItemTextActive focus:text-navItemTextActive" : ""}`}
                    >
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          )}
        </DropdownMenu>
        {showTooltip && (
          <TooltipContent
            side="right"
            alignOffset={3}
            sideOffset={0}
            className="hidden xl:block"
          >
            {title}
          </TooltipContent>
        )}
      </Tooltip>
      {!isCollapsed && isExpanded && (isSideMenuOpen || !isDesktop) && (
        <div className="ml-[1.6rem] relative -mt-[0.1rem] 1xl:-mt-[0.2rem] 3xl:-mt-[0.3rem]">
          <div
            ref={verticalLineRef}
            className="absolute left-0 top-0 w-0.5 bg-submenuTreeLine"
          ></div>
          {submenuItems.map((item, index) => {
            const normalizedPathname = currentPathname?.endsWith("/")
              ? currentPathname.slice(0, -1)
              : currentPathname;
            const normalizedPath = item.path.endsWith("/")
              ? item.path.slice(0, -1)
              : item.path;
            const isActive = normalizedPathname === normalizedPath;

            return (
              <Link
                key={item.path}
                href={item.path}
                target={item.newTab ? "_blank" : undefined}
                ref={(el) => {
                  submenuRefs.current[index] = el;
                }}
                className="block mb-px 1xl:mb-1 3xl:mb-2 -ml-[1.6rem] w-[calc(100%+1.6rem)] rounded-md relative focus-visible:outline-offset-[-2px]"
              >
                <div className="absolute left-[calc(1.6rem+2px)] top-1/2 w-3 h-0.5 bg-submenuTreeLine"></div>
                <div
                  onClick={handleMenuItemClick}
                  className={`flex rounded-md items-center py-[0.4rem] 1xl:py-[0.45rem] 3xl:py-[0.6rem] pl-[3.2rem] w-full pr-2 transition ${
                    isActive
                      ? "bg-navItemActiveBg hover:bg-navItemActiveBgHover"
                      : "bg-navItemBg hover:bg-navItemBgHover"
                  }`}
                >
                  <div
                    className={`text-xs xl:text-xs 3xl:text-sm font-medium tracking-wide ${
                      isActive ? "text-navItemTextActive" : "text-navItemText"
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
