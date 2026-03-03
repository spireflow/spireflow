import { useEffect, useRef, useState } from "react";

import { MoonIcon } from "../../assets/icons/MoonIcon";
import { SunIcon } from "../../assets/icons/SunIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/common/shadcn/tooltip";
import { ThemeButtonProps } from "./types";

export const ThemeButton = ({
  theme,
  selectTheme,
  userDropdown,
  languageDropdown,
  notificationsDropdown,
  t,
}: Omit<ThemeButtonProps, "themeTooltip">) => {
  const [isMounted, setIsMounted] = useState(false);
  const currentTheme = theme || "light";
  const [sliderDark, setSliderDark] = useState(currentTheme === "dark");

  /** Blocks tooltip open until next pointer move or keyboard focus */
  const suppressTooltipRef = useRef(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  /** Prevents tooltip from showing when Firefox re-fires hover events on tab switch */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        suppressTooltipRef.current = true;
        setTooltipOpen(false);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSliderDark(currentTheme === "dark");
    }, 10);
    return () => clearTimeout(timeout);
  }, [currentTheme]);

  const toggleTheme = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    selectTheme(newTheme);
    userDropdown.close();
    languageDropdown.close();
    notificationsDropdown.close();
  };

  const isAnyDropdownOpen =
    userDropdown.isOpen ||
    languageDropdown.isOpen ||
    notificationsDropdown.isOpen;

  return (
    <Tooltip
      delayDuration={200}
      open={tooltipOpen}
      onOpenChange={(open) => {
        if (open && suppressTooltipRef.current) return;
        if (open && isAnyDropdownOpen) return;
        setTooltipOpen(open);
      }}
    >
      <TooltipTrigger asChild>
        <div
          className="group relative flex items-center bg-themeToggleBg border border-mainBorder rounded-full py-0.5 pr-0.5 pl-0 cursor-pointer"
          /** Real mouse movement clears the suppress flag */
          onPointerMove={() => {
            suppressTooltipRef.current = false;
          }}
          /** Keyboard focus (Tab/Escape return) bypasses suppress and opens tooltip after state settles */
          onFocus={(e) => {
            if (
              e.target instanceof HTMLElement &&
              e.target.matches(":focus-visible")
            ) {
              suppressTooltipRef.current = false;
              const wrapper = e.currentTarget;
              setTimeout(() => {
                if (wrapper.contains(document.activeElement)) {
                  setTooltipOpen(true);
                }
              }, 0);
            }
          }}
          /** Suppress prevents tooltip reopen after re-render (pointer still over element) */
          onClick={() => {
            setTooltipOpen(false);
            suppressTooltipRef.current = true;
            toggleTheme();
          }}
          role="button"
          aria-label={t("changeTheme")}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              toggleTheme();
            }
          }}
        >
          {isMounted && (
            <div
              className="absolute left-0.5 top-0.5 w-9.5 h-[2.1825rem] rounded-full shadow-sm border border-themeToggleActiveBorder bg-themeToggleActiveBg transition-transform-forced"
              style={{
                transform: sliderDark ? "translateX(42px)" : "translateX(0px)",
              }}
            />
          )}
          <div
            className={`relative z-10 w-10.5 h-[2.1825rem] rounded-full flex items-center justify-center ${
              isMounted && currentTheme === "light"
                ? "text-primaryText"
                : "text-grayIcon"
            }`}
          >
            <SunIcon />
          </div>
          <div
            className={`relative z-10 w-10.5 h-[2.1825rem] rounded-full flex items-center justify-center ${
              isMounted && currentTheme === "dark"
                ? "text-primaryText"
                : "text-grayIcon"
            }`}
          >
            <MoonIcon />
          </div>
        </div>
      </TooltipTrigger>
      {!isAnyDropdownOpen && (
        <TooltipContent
          side="bottom"
          align="start"
          alignOffset={-30}
          className="hidden xl:block"
        >
          {t("changeTheme")}
        </TooltipContent>
      )}
    </Tooltip>
  );
};
