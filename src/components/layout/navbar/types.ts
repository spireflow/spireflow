import { RefObject } from "react";

export const NAVBAR_TOOLTIPS_ENABLED = false;

export interface TooltipProps {
  isTooltipVisible: boolean;
  showTooltip: () => void;
  hideTooltip: () => void;
}

export interface DropdownProps {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
  ref: React.RefObject<HTMLDivElement | null>;
}

export interface ModalActions {
  showLogout: () => void;
  showAbout: () => void;
  showChangelog: () => void;
  handleLogin: () => void;
  showSignUp: () => void;
}

export interface NavbarDropdowns {
  closeAllExcept: (keep?: string) => void;
  isAnyDropdownOpen: boolean;
}

export interface AboutModalProps {
  closeModal: () => void;
  returnFocusRef?: RefObject<HTMLButtonElement | null>;
  onShowContributing?: () => void;
}

export interface HamburgerButtonProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export interface LanguageButtonProps {
  currentLanguage: string;
  languageTooltip: TooltipProps;
  languageDropdown: DropdownProps;
  themeDropdown: DropdownProps;
  userDropdown: DropdownProps;
  notificationsDropdown: DropdownProps;
  t: (key: string) => string;
}

export interface ThemeButtonProps {
  theme: string | undefined;
  selectTheme: (theme: string) => void;
  themeTooltip: TooltipProps;
  userDropdown: DropdownProps;
  languageDropdown: DropdownProps;
  notificationsDropdown: DropdownProps;
  t: (key: string) => string;
}

export interface UserButtonProps {
  userIconBtnRef: RefObject<HTMLButtonElement | null>;
  closeMobileMenu: () => void;
  userDropdown: DropdownProps;
  navbarDropdowns: NavbarDropdowns;
  userTooltip: TooltipProps;
  modalActions: ModalActions;
  session: {
    username?: string | null;
    isLoggedIn?: boolean;
  } | null;
  theme: string | undefined;
  selectTheme: (theme: string) => void;
  t: (key: string) => string;
  currentLanguage: string;
}

export interface ChangelogModalProps {
  closeModal: () => void;
  returnFocusRef?: RefObject<HTMLButtonElement | null>;
}

export interface NotificationsButtonProps {
  notificationsDropdown: DropdownProps;
  notificationsTooltip: TooltipProps;
  navbarDropdowns: NavbarDropdowns;
  closeMobileMenu: () => void;
  t: (key: string) => string;
}

export interface SubMenuState {
  isLanguageMenuOpen: boolean;
  setIsLanguageMenuOpen: (value: boolean) => void;
  isAuthMenuOpen: boolean;
  setIsAuthMenuOpen: (value: boolean) => void;
  isThemeMenuOpen: boolean;
  setIsThemeMenuOpen: (value: boolean) => void;
  isSettingsDrawerOpen: boolean;
  setIsSettingsDrawerOpen: (value: boolean) => void;
}

export interface UserMenuDropdownProps {
  menuRef: React.RefObject<HTMLDivElement | null>;
  handleMenuKeyDown: (e: React.KeyboardEvent) => void;
  suppressTooltipRef: React.MutableRefObject<boolean>;
  tAuth: (key: string) => string;
  t: (key: string) => string;
  pathname: string;
  currentLanguage: string;
  currentTheme: string;
  subMenuState: SubMenuState;
  userDropdown: DropdownProps;
  modalActions: ModalActions;
  selectTheme: (theme: string) => void;
}
