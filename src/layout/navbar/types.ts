import { RefObject } from "react";

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

export interface AboutModalProps {
  closeModal: () => void;
  returnFocusRef?: RefObject<HTMLButtonElement | null>;
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
  themeDropdown: DropdownProps;
  languageDropdown: DropdownProps;
  notificationsDropdown: DropdownProps;
  userTooltip: TooltipProps;
  showLogoutModal: () => void;
  showAboutModal: () => void;
  showChangelogModal: () => void;
  handleLoginButton: () => void;
  showSignUpModal: () => void;
  session: {
    username?: string | null;
    isLoggedIn?: boolean;
  } | null;
  theme: string | undefined;
  selectTheme: (theme: string) => void;
  t: (key: string) => string;
  searchClose: () => void;
  currentLanguage: string;
}

export interface ChangelogModalProps {
  closeModal: () => void;
  returnFocusRef?: RefObject<HTMLButtonElement | null>;
}

export interface NotificationsButtonProps {
  notificationsDropdown: DropdownProps;
  notificationsTooltip: TooltipProps;
  themeDropdown: DropdownProps;
  languageDropdown: DropdownProps;
  userDropdown: DropdownProps;
  searchClose: () => void;
  t: (key: string) => string;
}
