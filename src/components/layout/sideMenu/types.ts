import { ComponentType, ReactElement } from "react";

interface SearchSection {
  id: string;
  titleKey: string;
}

export type MenuConfigEntry =
  | { type: "category"; titleKey: string }
  | {
      type: "item";
      titleKey: string;
      Icon: ComponentType;
      path: string;
      sections?: SearchSection[];
    }
  | {
      type: "submenu";
      titleKey: string;
      Icon: ComponentType;
      submenuItems: {
        titleKey: string;
        path: string;
        newTab?: boolean;
        sections?: SearchSection[];
      }[];
    };

export interface MenuCategoryProps {
  title: string;
}

export interface MenuItemProps {
  title: string;
  icon: ReactElement;
  path: string;
}

export interface SideMenuMobileProps {
  isMobileMenuOpen: boolean;
  onLoginButtonClick: () => void;
}
