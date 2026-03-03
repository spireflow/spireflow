import { useTranslations } from "next-intl";
import { ComponentType } from "react";

import { AnalyticsIcon } from "../../assets/icons/AnalyticsIcon";
import { ArrowLeftIcon } from "../../assets/icons/ArrowLeftIcon";
import { ArrowRightIcon } from "../../assets/icons/ArrowRightIcon";
import { CalendarIcon } from "../../assets/icons/CalendarIcon";
import { DashboardIcon } from "../../assets/icons/DashboardIcon";
import { DonutIcon } from "../../assets/icons/DonutIcon";
import { EcommerceIcon } from "../../assets/icons/EcommerceIcon";
import { FormsIcon } from "../../assets/icons/FormsIcon";
import { PasswordIcon } from "../../assets/icons/PasswordIcon";
import { TablesIcon } from "../../assets/icons/TablesIcon";
import { UIElementsIcon } from "../../assets/icons/UIElementsIcon";
import { UserProfileIcon } from "../../assets/icons/UserProfileIcon";
import { useAppStore } from "../../store/appStore";
import { Logo } from "./Logo";
import { MenuCategory } from "./MenuCategory";
import { MenuItem } from "./MenuItem";
import { MenuItemWithSubmenu } from "./MenuItemWithSubmenu";

type MenuConfigEntry =
  | { type: "category"; titleKey: string }
  | { type: "item"; titleKey: string; Icon: ComponentType; path: string }
  | {
      type: "submenu";
      titleKey: string;
      Icon: ComponentType;
      submenuItems: { titleKey: string; path: string; newTab?: boolean }[];
    };

export const menuConfig: MenuConfigEntry[] = [
  { type: "category", titleKey: "pages" },
  { type: "item", titleKey: "dashboard", Icon: DashboardIcon, path: "/" },
  {
    type: "submenu",
    titleKey: "eCommerce",
    Icon: EcommerceIcon,
    submenuItems: [
      { titleKey: "orders", path: "/orders" },
      { titleKey: "customers", path: "/customers" },
      { titleKey: "products", path: "/products" },
    ],
  },
  {
    type: "item",
    titleKey: "analytics",
    Icon: AnalyticsIcon,
    path: "/analytics",
  },
  {
    type: "item",
    titleKey: "userProfile",
    Icon: UserProfileIcon,
    path: "/profile",
  },
  { type: "item", titleKey: "calendar", Icon: CalendarIcon, path: "/calendar" },
  {
    type: "submenu",
    titleKey: "authentication",
    Icon: PasswordIcon,
    submenuItems: [
      { titleKey: "login", path: "/login", newTab: true },
      { titleKey: "register", path: "/register", newTab: true },
    ],
  },
  { type: "category", titleKey: "components" },
  {
    type: "item",
    titleKey: "uiElements",
    Icon: UIElementsIcon,
    path: "/ui-elements",
  },
  { type: "item", titleKey: "forms", Icon: FormsIcon, path: "/forms" },
  { type: "item", titleKey: "tables", Icon: TablesIcon, path: "/tables" },
  { type: "item", titleKey: "charts", Icon: DonutIcon, path: "/charts" },
];

export const SideMenu = () => {
  const { isSideMenuOpen, toggleSideMenu } = useAppStore();
  const t = useTranslations("sideMenu");

  return (
    <nav
      aria-label="Side navigation"
      className={`mt-0 3xl:mt-0 hidden xl:flex flex-col h-screen xl:w-52.5 1xl:min-w-55 3xl:min-w-67.5 white pt-0 2xl:pt-0 transition-all duration-200 ease-in-out ${
        !isSideMenuOpen && "xl:!max-w-12 !w-12 xl:!min-w-18 pr-0"
      }
      `}
    >
      <div
        className={`pl-3 pt-0 1xl:pt-0 z-[40] 2xl:pt-0 3xl:pt-0 fixed xl:w-52.5 1xl:min-w-55 3xl:min-w-67.5 bg-navigationBg h-dvh border-r-[1px] border-cardBorder transition-all duration-200 ease-in-out flex flex-col ${
          !isSideMenuOpen &&
          "xl:!max-w-12 xl:!w-12 xl:!min-w-18 !pl-0 pr-[0.1rem]"
        }
          `}
      >
        <div
          className={`flex shrink-0 h-18 3xl:h-20 items-center pr-2 pl-[1.4rem] 3xl:pl-[2.4rem] xl:translate-y-[0.7rem] transition-all duration-200 ${
            !isSideMenuOpen &&
            "xl:!w-18 3xl:pr-2 !pl-[1.2rem] 3xl:!pl-[1.05rem]"
          }`}
        >
          <Logo />
        </div>
        <div
          className={`flex-1 overflow-y-auto overflow-x-hidden ${isSideMenuOpen ? "pr-3" : ""}`}
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
