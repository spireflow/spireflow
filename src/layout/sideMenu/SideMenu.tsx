import { useTranslations } from "next-intl";

import { AnalyticsIcon } from "../../assets/icons/AnalyticsIcon";
import { AreaIcon } from "../../assets/icons/AreaIcon";
import { BarsIcon } from "../../assets/icons/BarsIcon";
import { CalendarIcon } from "../../assets/icons/CalendarIcon";
import { CustomersIcon } from "../../assets/icons/CustomersIcon";
import { DashboardIcon } from "../../assets/icons/DashboardIcon";
import { OrdersIcon } from "../../assets/icons/OrdersIcon";
import { ProductsIcon } from "../../assets/icons/ProductsIcon";
import { UserIcon } from "../../assets/icons/UserIcon";
import { PasswordIcon } from "../../assets/icons/PasswordIcon";
import { DocumentIcon } from "../../assets/icons/DocumentIcon";
import { DonutIcon } from "../../assets/icons/DonutIcon";
import { EcommerceIcon } from "../../assets/icons/EcommerceIcon";
import { UserProfileIcon } from "../../assets/icons/UserProfileIcon";
import { FormsIcon } from "../../assets/icons/FormsIcon";
import { UIElementsIcon } from "../../assets/icons/UIElementsIcon";
import { TablesIcon } from "../../assets/icons/TablesIcon";
import { useAppStore } from "../../store/appStore";
import { MenuCategory } from "./MenuCategory";
import { MenuItem } from "./MenuItem";
import { MenuItemWithSubmenu } from "./MenuItemWithSubmenu";
import { Logo } from "./Logo";
import { ArrowLeftIcon } from "../../assets/icons/ArrowLeftIcon";
import { ArrowRightIcon } from "../../assets/icons/ArrowRightIcon";

export const SideMenu = () => {
  const { isSideMenuOpen, toggleSideMenu } = useAppStore();
  const t = useTranslations("sideMenu");

  return (
    <div
      className={`mt-0 3xl:mt-0 hidden  xl:flex flex-col h-screen xl:w-[210px] 1xl:min-w-[220px] 3xl:min-w-[270px]  white pt-0 2xl:pt-0  ${
        !isSideMenuOpen &&
        "xl:!max-w-[3rem] !w-[3rem] xl:!min-w-[4.5rem] pr-0 transition"
      }   
      `}
    >
      <div
        className={`px-3 pt-0 1xl:pt-0 z-[40] 2xl:pt-0 3xl:pt-0 fixed xl:w-[210px] 1xl:min-w-[220px] 3xl:min-w-[270px] bg-navigationBg h-full border-r-[1px] border-cardBorder  ${
          !isSideMenuOpen &&
          "xl:!max-w-[3rem] xl:!w-[3rem] xl:!min-w-[4.5rem] justify-center items-center pr-0 pt-4 pl-0 transition pr-[0.1rem]"
        }   
        `}
      >
        <div
          className={`flex -mb-5 3xl:-mb-4 pt-1 justify-center pr-2     ${
            !isSideMenuOpen && "xl:!w-[4.5rem] 3xl:pr-2 pl-2"
          }     
                `}
        >
          <Logo />
        </div>
        <MenuCategory title={t("pages")} />
        <MenuItem title={t("dashboard")} icon={<DashboardIcon />} path="/" />
        <MenuItemWithSubmenu
          title={t("eCommerce")}
          icon={<EcommerceIcon />}
          submenuItems={[
            { title: t("orders"), path: "/orders" },
            { title: t("customers"), path: "/customers" },
            { title: t("products"), path: "/products" },
          ]}
        />
        <MenuItem
          title={t("analytics")}
          icon={<AnalyticsIcon />}
          path="/analytics"
        />
        <MenuItem
          title={t("userProfile")}
          icon={<UserProfileIcon />}
          path="/profile"
        />
        <MenuItem
          title={t("calendar")}
          icon={<CalendarIcon />}
          path="/calendar"
        />{" "}
        <MenuItemWithSubmenu
          title={t("authentication")}
          icon={<PasswordIcon />}
          submenuItems={[
            { title: t("login"), path: "/login", newTab: true },
            { title: t("register"), path: "/register", newTab: true },
          ]}
        />
        <MenuCategory title={t("components")} />
        <MenuItem
          title={t("uiElements")}
          icon={<UIElementsIcon />}
          path="/ui-elements"
        />
        <MenuItem title={t("forms")} icon={<FormsIcon />} path="/forms" />
        <MenuItem title={t("tables")} icon={<TablesIcon />} path="/tables" />
        <MenuItem title={t("charts")} icon={<DonutIcon />} path="/charts" />
        <div
          onClick={toggleSideMenu}
          className="-mr-3 1xl:-mr-4 border-mainBorder hover:border-mainBorderHover border absolute h-6 w-6 1xl:w-7 1xl:h-7 bg-primaryBg rounded-full top-6 right-0 text-grayIcon text-secondaryText flex justify-center items-center cursor-pointer"
        >
          {isSideMenuOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
        </div>
      </div>
    </div>
  );
};
