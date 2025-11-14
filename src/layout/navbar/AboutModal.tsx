import React, { useRef, useEffect } from "react";
import Link from "next/link";

import { CloseIcon } from "../../assets/icons/CloseIcon";
import { GithubIcon } from "../../assets/icons/GithubIcon";
import { useCloseModal } from "../../hooks/useCloseModal";
import { OutlinedButton } from "../../components/common/OutlinedButton";
import { AboutModalProps } from "./types";

export const AboutModal = ({ closeModal }: AboutModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useCloseModal(modalRef, closeModal);

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
    // I didn't use common modal component here because this modal needs unique padding values for mobile and tablet
    <div className="aboutModal alternativeScrollbar">
      <div className="fixed w-screen h-screen bg-[rgb(0,0,0,0.35)] backdrop-blur-sm top-0 left-0 z-40" />
      <div className="fixed w-screen h-full flex justify-center items-center top-0 left-0 z-50">
        <div
          ref={modalRef}
          className="w-screen h-full md:w-auto md:h-auto bg-loginModalBg shadow-xl px-[0vw] md:px-10 pt-0 md:pt-[3rem] md:pb-12 flex flex-col items-center justify-start md:rounded-2xl relative"
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-xl fill-secondaryText stroke-secondaryText hover:stroke-secondaryTextHover hover:fill-secondaryTextHover"
          >
            <CloseIcon />
          </button>
          <div className="md:max-h-[70vh] 1xl-max-h-[60vh] w-full -mr-4 overflow-auto pr-4 max-w-full md:max-w-[36rem]">
            <div className="flex items-center justify-center w-full flex-col gap-2 mt-8 md:-mt-4 px-8 md:px-0">
              <h2 className="text-primaryText text-3xl w-full text-left mt-2">
                About
              </h2>
            </div>
            <div className="text-primaryText text-base w-full mt-4 text-left px-8 md:px-0">
              <p className="mb-4 text-base">
                Spireflow is an open source and free dashboard template, written
                in NextJS and TypeScript. It is connected to NodeJS backend with
                PostgreSQL database containing data for a fictional electronic
                store.
              </p>
            </div>
            <div className="flex flex-row justify-start w-full mt-3 text-base gap-3 sm:gap-4 px-8 md:px-0 sm:h-12 mb-4">
              <Link
                href="https://github.com/matt765/spireflow"
                className="text-primaryText flex-1 xsm:flex-initial xsm:w-auto"
                target="_blank"
              >
                <OutlinedButton
                  text="Front-end"
                  icon={<GithubIcon />}
                  className="sm:!px-6"
                />
              </Link>
              <Link
                href="https://github.com/matt765/spireflow-backend"
                className="text-primaryText flex-1 xsm:flex-initial xsm:w-auto"
                target="_blank"
              >
                <OutlinedButton
                  text="Back-end"
                  icon={<GithubIcon />}
                  className="sm:!px-6"
                />
              </Link>
            </div>
            <div className="text-primaryText text-base w-full text-left px-8 md:px-0">
              <p className="text-left w-full mt-4 text-xl">Tech stack:</p>
              <div className="mt-4">
                <p className="text-secondaryText mb-2">Front-End:</p>
              </div>
              <ul className="list-disc list-inside mb-4 pl-3 text-primaryText">
                <li>ReactJS</li>
                <li>NextJS</li>
                <li>TypeScript</li>
                <li>Tailwind</li>
                <li>Zustand</li>
                <li>Apollo Client</li>
                <li>Recharts</li>
                <li>Better-Auth</li>
                <li>Jest</li>
              </ul>
              <div>
                <p className="text-secondaryText mb-2">Back-End:</p>
              </div>
              <ul className="list-disc list-inside pl-3 mb-8 md:mb-0">
                <li>NodeJS</li>
                <li>Fastify</li>
                <li>PostgreSQL</li>
                <li>Prisma</li>
                <li>GraphQL</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
