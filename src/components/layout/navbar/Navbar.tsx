"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

import { useAppStore } from "../../../store/appStore";
import { BREAKPOINTS } from "../../../styles/breakpoints";
import { LoginModal } from "../../auth/LoginModal";
import { LogoutModal } from "../../auth/LogoutModal";
import { SignUpModal } from "../../auth/SignUpModal";
import { Logo } from "../sideMenu/parts/Logo";
import { SideMenuMobile } from "../sideMenu/SideMenuMobile";
import { useNavbar } from "./hooks/useNavbar";
import { useNavbarModals } from "./hooks/useNavbarModals";
import { AboutModal } from "./parts/AboutModal";
import { ChangelogModal } from "./parts/ChangelogModal";
import { FloatingMenuButton } from "./parts/FloatingMenuButton";
import { HamburgerButton } from "./parts/HamburgerButton";
import { NotificationsButton } from "./parts/NotificationsButton";
import { SearchInput } from "./parts/SearchInput";
import { ThemeButton } from "./parts/ThemeButton";
import { UserMenuButton } from "./parts/UserMenuButton";

export const Navbar = () => {
  const t = useTranslations("navbar");
  const setIsLoggingOut = useAppStore((state) => state.setIsLoggingOut);
  const setIsLoggingIn = useAppStore((state) => state.setIsLoggingIn);
  const fixedNavbar = useAppStore((state) => state.fixedNavbar);
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsLoggingOut(false);
    setIsLoggingIn(false);
  }, [setIsLoggingOut, setIsLoggingIn]);

  useEffect(() => {
    if (fixedNavbar || typeof window === "undefined") return;

    const isDesktop = () => window.innerWidth >= BREAKPOINTS.xl;

    const handleScroll = () => {
      if (!navbarRef.current || !isDesktop()) return;
      navbarRef.current.style.transform = `translateY(-${Math.max(0, window.scrollY)}px)`;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    const navbarNode = navbarRef.current;
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (navbarNode) {
        navbarNode.style.transform = "";
      }
    };
  }, [fixedNavbar]);

  const {
    theme,
    currentLanguage,
    isMobileMenuOpen,
    toggleMobileMenu,
    isSideMenuOpen,
    closeMobileMenu,
    session,
    userIconBtnRef,
    themeDropdown,
    userDropdown,
    languageDropdown,
    selectTheme,
    searchDropdown,
    notificationsDropdown,
  } = useNavbar();

  const {
    isLoginModalOpen,
    isSignUpModalOpen,
    isLogoutModalOpen,
    isAboutModalOpen,
    isChangelogModalOpen,
    closeLoginModal,
    closeSignUpModal,
    closeLogoutModal,
    closeAboutModal,
    closeChangelogModal,
    showLogoutModal,
    showAboutModal,
    showChangelogModal,
    showSignUpModal,
    switchToSignUp,
    switchToSignIn,
    handleLoginButton,
  } = useNavbarModals();

  return (
    <>
      <header
        ref={navbarRef}
        className="w-full flex items-center z-30 fixed h-18 bg-primaryBg 3xl:h-20 border-b border-solid border-mainBorder"
        style={{ willChange: fixedNavbar ? "auto" : "transform" }}
      >
        {/* Placeholder for maintaining consistent spacing with page wrapper */}
        <div
          className={`hidden xl:block xl:w-52.5 1xl:min-w-55 3xl:min-w-67.5 h-12 transition-all duration-200 ease-in-out ${
            !isSideMenuOpen && "xl:!max-w-12 !w-12 xl:!min-w-18"
          }`}
        ></div>
        <div
          className={`px-6 xsm:pr-8 md:px-6 md:pr-8 xl:pl-3 xl:pr-2 2xl:px-4 z-40 w-full flex justify-between xl:mx-auto items-center gap-4 xl:gap-7 xl:max-w-[82%] 1xl:max-w-[82%] 2xl:max-w-[83vw] 3xl:max-w-[82vw] 5xl:max-w-408`}
        >
          <div className="flex items-center gap-10">
            <div className="flex xsm:pl-2  xl:hidden">
              <Logo />
            </div>
            <SearchInput
              isOpen={searchDropdown.isOpen}
              ref={searchDropdown.ref}
              open={searchDropdown.open}
              close={searchDropdown.close}
              closeOthers={() => {
                themeDropdown.close();
                languageDropdown.close();
                userDropdown.close();
                closeMobileMenu();
              }}
            />
          </div>
          <div className="flex items-center gap-2 md:gap-2 xl:gap-3.5 z-[99]">
            <div className="hidden xl:flex">
              <ThemeButton
                theme={theme}
                selectTheme={selectTheme}
                userDropdown={userDropdown}
                languageDropdown={languageDropdown}
                notificationsDropdown={notificationsDropdown}
                t={t}
              />
            </div>
            <div className="xl:ml-3.5">
              <NotificationsButton
                notificationsDropdown={notificationsDropdown}
                themeDropdown={themeDropdown}
                languageDropdown={languageDropdown}
                userDropdown={userDropdown}
                searchClose={searchDropdown.close}
                closeMobileMenu={closeMobileMenu}
                t={t}
              />
            </div>
            <div className="flex items-center ml-auto">
              <UserMenuButton
                userIconBtnRef={userIconBtnRef}
                closeMobileMenu={closeMobileMenu}
                userDropdown={userDropdown}
                themeDropdown={themeDropdown}
                languageDropdown={languageDropdown}
                notificationsDropdown={notificationsDropdown}
                showLogoutModal={showLogoutModal}
                showAboutModal={showAboutModal}
                showChangelogModal={showChangelogModal}
                handleLoginButton={handleLoginButton}
                showSignUpModal={showSignUpModal}
                session={session}
                theme={theme}
                searchClose={searchDropdown.close}
                currentLanguage={currentLanguage}
                selectTheme={selectTheme}
                t={t}
              />
              <div className="hidden xl:block">
                <HamburgerButton
                  isMobileMenuOpen={isMobileMenuOpen}
                  toggleMobileMenu={() => {
                    searchDropdown.close();
                    toggleMobileMenu();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <SideMenuMobile
        isMobileMenuOpen={isMobileMenuOpen}
        onLoginButtonClick={handleLoginButton}
      />
      <FloatingMenuButton
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={() => {
          searchDropdown.close();
          toggleMobileMenu();
        }}
      />
      {isMobileMenuOpen && (
        <div
          className="fixed top-18 bottom-0 w-full bg-[rgb(0,0,0,0.35)] z-10 cursor-pointer"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}
      {isLogoutModalOpen && (
        <LogoutModal
          closeModal={closeLogoutModal}
          returnFocusRef={userIconBtnRef}
        />
      )}
      {isAboutModalOpen && (
        <AboutModal
          closeModal={closeAboutModal}
          returnFocusRef={userIconBtnRef}
        />
      )}
      {isChangelogModalOpen && (
        <ChangelogModal
          closeModal={closeChangelogModal}
          returnFocusRef={userIconBtnRef}
        />
      )}
      {isLoginModalOpen && (
        <LoginModal
          closeModal={closeLoginModal}
          switchToSignUp={switchToSignUp}
          returnFocusRef={userIconBtnRef}
        />
      )}
      {isSignUpModalOpen && (
        <SignUpModal
          closeModal={closeSignUpModal}
          switchToSignIn={switchToSignIn}
          returnFocusRef={userIconBtnRef}
        />
      )}
    </>
  );
};
