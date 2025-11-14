import React, { useRef, useEffect } from "react";

import { CloseIcon } from "../../assets/icons/CloseIcon";
import { useCloseModal } from "../../hooks/useCloseModal";
import { ModalPortal } from "./ModalPortal";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  hasBlur?: boolean;
}

export const Modal = ({
  children,
  onClose,
  ariaLabelledby,
  ariaDescribedby,
  hasBlur = false,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useCloseModal(modalRef, onClose);

  // Block body scroll when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const originalBackground = document.body.style.background;

    // Calculate scrollbar width
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // Get the scrollbar placeholder color from CSS variable
    const scrollbarPlaceholderBg = getComputedStyle(document.documentElement)
      .getPropertyValue("--scrollbarPlaceholderBg")
      .trim();

    // Add padding to compensate for scrollbar removal and set background
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.background = `linear-gradient(to right, transparent calc(100% - ${scrollbarWidth}px), ${scrollbarPlaceholderBg} calc(100% - ${scrollbarWidth}px))`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      document.body.style.background = originalBackground;
    };
  }, []);

  return (
    <ModalPortal>
      <div
        className={`fixed w-screen h-screen bg-[rgb(0,0,0,0.35)] top-0 left-0 z-[9997] ${hasBlur ? "backdrop-blur-sm" : ""}`}
      />
      <div className="fixed w-screen h-screen flex justify-center items-center top-0 left-0 z-[9999]">
        <div
          ref={modalRef}
          role="dialog"
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
          className="w-screen h-screen md:w-auto md:h-auto bg-modalBg shadow-xl px-[6vw] xsm:px-[18vw] sm:px-12 pt-24 sm:pt-[3rem] pb-12 flex flex-col items-center justify-start sm:rounded-2xl relative"
        >
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-6 text-xl fill-secondaryText stroke-secondaryText hover:stroke-secondaryTextHover hover:fill-secondaryTextHover"
          >
            <CloseIcon />
          </button>
          {children}
        </div>
      </div>
    </ModalPortal>
  );
};
