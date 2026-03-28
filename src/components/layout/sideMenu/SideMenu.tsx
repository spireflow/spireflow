import { useTranslations } from "next-intl";

import { ArrowLeftIcon } from "@/assets/icons/ArrowLeftIcon";
import { ArrowRightIcon } from "@/assets/icons/ArrowRightIcon";
import { menuConfig } from "@/config/navigationConfig";
import { useLayoutStore } from "@/store/layoutStore";

import { Logo } from "./parts/Logo";
import { MenuCategory } from "./parts/MenuCategory";
import { MenuItem } from "./parts/MenuItem";
import { MenuItemWithSubmenu } from "./parts/MenuItemWithSubmenu";

export const SideMenu = () => {
  const isSideMenuOpen = useLayoutStore((s) => s.isSideMenuOpen);
  const toggleSideMenu = useLayoutStore((s) => s.toggleSideMenu);
  const t = useTranslations("sideMenu");

  return (
    <nav
      aria-label="Side navigation"
      className={`mt-0 3xl:mt-0 hidden xl:flex flex-col h-screen xl:w-57.5 xl:min-w-57.5 1xl:min-w-62.5 3xl:min-w-67.5 pt-0 2xl:pt-0 transition-all duration-200 ease-in-out ${
        !isSideMenuOpen && "xl:!max-w-12 !w-12 xl:!min-w-18 pr-0"
      }
      `}
    >
      <div
        className={`pl-3 pt-0 1xl:pt-0 z-[40] 2xl:pt-0 3xl:pt-0 fixed xl:w-57.5 xl:min-w-57.5 1xl:min-w-62.5 3xl:min-w-67.5 bg-navigationBg h-dvh border-r-[1px] border-mainBorder transition-all duration-200 ease-in-out flex flex-col ${
          !isSideMenuOpen &&
          "xl:!max-w-12 xl:!w-12 xl:!min-w-18 !pl-0 pr-[0.1rem]"
        }
          `}
      >
        <div
          className={`flex shrink-0 h-18 3xl:h-20 items-center pr-2 pl-[1.4rem] xl:pl-[2.3rem] 1xl:pl-[2.7rem] 3xl:pl-[2.9rem] xl:translate-y-[0.7rem] transition-all duration-200 ${
            !isSideMenuOpen &&
            "xl:!w-18 3xl:pr-2 !pl-[1.2rem] 3xl:!pl-[1.05rem]"
          }`}
        >
          <Logo />
        </div>
        <div
          className={`flex-1 overflow-y-auto overflow-x-hidden pb-4 transition-[padding] duration-200 ease-in-out ${isSideMenuOpen ? "pr-3" : "pr-0"}`}
        >
          {menuConfig.map((entry) => {
            switch (entry.type) {
              case "category":
                return (
                  <MenuCategory
                    key={entry.titleKey}
                    title={t(entry.titleKey)}
                  />
                );
              case "item":
                return (
                  <MenuItem
                    key={entry.path}
                    title={t(entry.titleKey)}
                    icon={<entry.Icon />}
                    path={entry.path}
                  />
                );
              case "submenu":
                return (
                  <MenuItemWithSubmenu
                    key={entry.titleKey}
                    title={t(entry.titleKey)}
                    icon={<entry.Icon />}
                    submenuItems={entry.submenuItems.map((si) => ({
                      title: t(si.titleKey),
                      path: si.path,
                      newTab: si.newTab,
                    }))}
                  />
                );
            }
          })}
        </div>
        <div
          onClick={toggleSideMenu}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleSideMenu();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={isSideMenuOpen ? "Collapse menu" : "Expand menu"}
          className="-mr-3 1xl:-mr-4 border-mainBorder hover:border-mainBorderHover border absolute h-6 w-6 1xl:w-7 1xl:h-7 bg-primaryBg rounded-full top-6 right-0 text-grayIcon text-secondaryText flex justify-center items-center cursor-pointer 1xl:-translate-y-[0.2rem] 3xl:translate-y-0"
        >
          {isSideMenuOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
        </div>
      </div>
    </nav>
  );
};
