"use client";

import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef } from "react";

import { LoginModal } from "@/components/auth/LoginModal";
import { LogoutModal } from "@/components/auth/LogoutModal";
import { SignUpModal } from "@/components/auth/SignUpModal";
import { useLayoutStore } from "@/store/layoutStore";
import { BREAKPOINTS } from "@/styles/breakpoints";

import { CONTENT_MAX_WIDTH } from "../Layout";
import { Logo } from "../sideMenu/parts/Logo";
import { SideMenuMobile } from "../sideMenu/SideMenuMobile";
import { useNavbar } from "./hooks/useNavbar";
import { useNavbarModals } from "./hooks/useNavbarModals";
import { AboutModal } from "./parts/AboutModal";
import { ChangelogModal } from "./parts/ChangelogModal";
import { ContributingModal } from "./parts/ContributingModal";
import { FloatingMenuButton } from "./parts/FloatingMenuButton";
import { NotificationsButton } from "./parts/NotificationsButton";
import { SearchInput } from "./parts/SearchInput";
import { ThemeButton } from "./parts/ThemeButton";
import { UserMenuButton } from "./parts/UserMenuButton";

export const Navbar = () => {
  const t = useTranslations("navbar");
  const setIsLoggingOut = useLayoutStore((state) => state.setIsLoggingOut);
  const setIsLoggingIn = useLayoutStore((state) => state.setIsLoggingIn);
  const fixedNavbar = useLayoutStore((state) => state.fixedNavbar);
  const navbarRef = useRef<HTMLElement>(null);

  /** Clears login/logout transition flags on mount so stale state from a previous page doesn't persist. */
  useEffect(() => {
    setIsLoggingOut(false);
    setIsLoggingIn(false);
  }, [setIsLoggingOut, setIsLoggingIn]);

  /** Slides the navbar off-screen on scroll when not in fixed mode. Uses manual translateY because CSS sticky doesn't support hiding the navbar above the viewport. */
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
    navbarDropdowns,
  } = useNavbar();

  const {
    isLoginModalOpen,
    isSignUpModalOpen,
    isLogoutModalOpen,
    isAboutModalOpen,
    isContributingModalOpen,
    isChangelogModalOpen,
    closeLoginModal,
    closeSignUpModal,
    closeLogoutModal,
    closeAboutModal,
    closeContributingModal,
    closeChangelogModal,
    showLogoutModal,
    showAboutModal,
    showContributingModal,
    showChangelogModal,
    showSignUpModal,
    switchToSignUp,
    switchToSignIn,
    handleLoginButton,
  } = useNavbarModals();

  const modalActions = useMemo(
    () => ({
      showLogout: showLogoutModal,
      showAbout: showAboutModal,
      showChangelog: showChangelogModal,
      handleLogin: handleLoginButton,
      showSignUp: showSignUpModal,
    }),
    [
      showLogoutModal,
      showAboutModal,
      showChangelogModal,
      handleLoginButton,
      showSignUpModal,
    ],
  );

  return (
    <>
      <header
        ref={navbarRef}
        className="w-full flex items-center z-30 fixed h-18 bg-primaryBg 3xl:h-20 border-b border-solid border-mainBorder"
        style={{ willChange: fixedNavbar ? "auto" : "transform" }}
      >
        {/* Placeholder for maintaining consistent spacing with page wrapper */}
        <div
          className={`hidden xl:block xl:w-57.5 1xl:min-w-62.5 3xl:min-w-67.5 h-12 transition-all duration-200 ease-in-out ${
            !isSideMenuOpen && "xl:!max-w-12 !w-12 xl:!min-w-18"
          }`}
        ></div>
        <div
          className={`px-6 xsm:pr-8 md:px-6 md:pr-8 xl:pl-3 xl:pr-2 2xl:px-4 z-40 w-full flex justify-between xl:mx-auto items-center gap-4 xl:gap-7 ${CONTENT_MAX_WIDTH}`}
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
                navbarDropdowns={navbarDropdowns}
                closeMobileMenu={closeMobileMenu}
                t={t}
              />
            </div>
            <div className="flex items-center ml-auto">
              <UserMenuButton
                userIconBtnRef={userIconBtnRef}
                closeMobileMenu={closeMobileMenu}
                userDropdown={userDropdown}
                navbarDropdowns={navbarDropdowns}
                modalActions={modalActions}
                session={session}
                theme={theme}
                currentLanguage={currentLanguage}
                selectTheme={selectTheme}
                t={t}
              />
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
          onShowContributing={showContributingModal}
          returnFocusRef={userIconBtnRef}
        />
      )}
      {isContributingModalOpen && (
        <ContributingModal
          closeModal={closeContributingModal}
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
