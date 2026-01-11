"use client";

import { useState, useEffect, ReactElement } from "react";
import { usePathname } from "next/navigation";

import { useAppStore } from "../../store/appStore";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Link } from "../../i18n/navigation";
import { useIsFirstRender } from "../../hooks/useIsFirstRender";
import { outfit } from "../../styles/fonts";
import { ChevronDownIcon } from "../../assets/icons/ChevronDownIcon";

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
  const toggleMobileMenu = useAppStore((state) => state.toggleMobileMenu);
  const { isSideMenuOpen } = useAppStore();
  const currentPathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const [activeSubmenuPath, setActiveSubmenuPath] = useState<string | null>(
    null
  );

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

  const isFirstRender = useIsFirstRender();
  if (isFirstRender) return null;

  const isAnySubmenuActive = activeSubmenuPath !== null;
  const isCollapsed = !isSideMenuOpen && isDesktop;

  // When collapsed, link to first submenu item
  const collapsedLinkPath = submenuItems[0]?.path || "/";

  const sharedClassName = `
    flex relative rounded-md items-center py-[0.5rem] 1xl:py-[0.55rem] 3xl:py-[0.7rem] pl-4 mb-[1px] 1xl:mb-1 3xl:mb-2 w-full pr-2 cursor-pointer transition ${
      isAnySubmenuActive
        ? "bg-navItemActiveBg hover:bg-navItemActiveBgHover border-l-2 border-transparent"
        : "bg-navItemBg hover:bg-navItemBgHover border-l-2 border-transparent"
    }
    ${
      isCollapsed &&
      "!pl-1 pl-8 justify-center items-center !w-10 rounded-full"
    }
  `;

  const iconContent = (
    <div
      className={`menuItemIcon pr-3 ${
        isAnySubmenuActive
          ? "stroke-mainColor fill-mainColor text-mainColor"
          : "stroke-grayIcon fill-grayIcon text-grayIcon"
      }
      ${isCollapsed && "pl-4"}
      `}
    >
      {icon}
    </div>
  );

  return (
    <>
      {isCollapsed ? (
        <Link
          href={collapsedLinkPath}
          onClick={handleMenuItemClick}
          className="flex flex-col justify-center w-full py-0 items-center"
        >
          <div className={sharedClassName}>
            {iconContent}
          </div>
        </Link>
      ) : (
        <div className="w-full">
          <div onClick={handleToggle} className={sharedClassName}>
            {iconContent}
            {(isSideMenuOpen || !isDesktop) && (
              <>
                <div
                  className={`text-xs xl:text-[12px] 3xl:text-[0.88rem] font-medium tracking-wide flex-1 ${
                    outfit.className
                  } ${
                    isAnySubmenuActive
                      ? "text-navItemTextActive"
                      : "text-navItemText"
                  }`}
                >
                  {title}
                </div>
                <div
                  className={`transition-transform ${
                    isExpanded ? "rotate-180" : "rotate-0"
                  } ${
                    isAnySubmenuActive
                      ? "stroke-grayIcon text-grayIcon"
                      : "stroke-grayIcon text-grayIcon"
                  }`}
                >
                  <ChevronDownIcon />
                </div>
              </>
            )}
          </div>

      {/* Submenu items */}
      {isExpanded && (isSideMenuOpen || !isDesktop) && (
        <div className="ml-[1.6rem] relative">
          <div
            className="absolute left-0 top-0 w-[2px] bg-cardBorder"
            style={{ height: "calc(100% - 1.3rem)" }}
          ></div>
          {submenuItems.map((item) => {
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
              >
                <div
                  onClick={handleMenuItemClick}
                  className={`
                    flex rounded-md items-center py-[0.4rem] 1xl:py-[0.45rem] 3xl:py-[0.6rem] pl-[3.2rem] -ml-[1.6rem] mb-[1px] 1xl:mb-1 3xl:mb-2 w-[calc(100%+1.6rem)] pr-2 transition ${
                      isActive
                        ? "bg-navItemActiveBg hover:bg-navItemActiveBgHover"
                        : "bg-navItemBg hover:bg-navItemBgHover"
                    }
                  `}
                >
                  <div
                    className={`text-xs xl:text-[11px] 3xl:text-[0.82rem] font-medium tracking-wide ${
                      outfit.className
                    } ${
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
      )}
    </>
  );
};
