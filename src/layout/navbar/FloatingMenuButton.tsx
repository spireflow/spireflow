import React from "react";

import { HamburgerButtonProps } from "./types";

export const FloatingMenuButton = ({
  isMobileMenuOpen,
  toggleMobileMenu,
}: HamburgerButtonProps) => (
  <button
    className="fixed bottom-6 right-6 z-[60] flex items-center justify-center w-14 h-14 rounded-full bg-floatingMenuButtonBg hover:bg-floatingMenuButtonBgHover border border-mainBorder shadow-lg transition-all duration-200 sm:hidden"
    onClick={toggleMobileMenu}
    aria-label="Toggle menu"
  >
    <div className="relative flex overflow-hidden items-center justify-center w-[20px] h-[20px] transform transition-all duration-200">
      <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
        <div
          className={`bg-secondaryText h-[2px] w-7 transform transition-all duration-300 origin-left ${
            isMobileMenuOpen ? "translate-x-10" : ""
          }`}
        ></div>
        <div
          className={`bg-secondaryText h-[2px] w-7 rounded transform transition-all duration-300 ${
            isMobileMenuOpen ? "translate-x-10 delay-75" : ""
          }`}
        ></div>
        <div
          className={`bg-secondaryText h-[2px] w-7 transform transition-all duration-300 origin-left ${
            isMobileMenuOpen ? "translate-x-10 delay-150" : ""
          }`}
        ></div>
        <div
          className={`absolute items-center justify-between transform transition-all duration-500 top-2.5 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-10"
          } flex w-0 ${isMobileMenuOpen ? "w-12" : ""}`}
        >
          <div
            className={`absolute bg-secondaryText h-[2px] w-5 transform transition-all duration-500 ${
              isMobileMenuOpen ? "rotate-45 delay-300" : "rotate-0"
            }`}
          ></div>
          <div
            className={`absolute bg-secondaryText h-[2px] w-5 transform transition-all duration-500 ${
              isMobileMenuOpen ? "-rotate-45 delay-300" : "-rotate-0"
            }`}
          ></div>
        </div>
      </div>
    </div>
  </button>
);
