import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

import { useLayoutStore } from "../../../store/layoutStore";

interface UseSettingsProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Aggregates all settings panel state (theme, font, chart animations, fixed navbar).
 * Supports both controlled and uncontrolled open/close - when `open` / `onOpenChange`
 * props are provided the component is controlled; otherwise an internal state is used.
 */
export const useSettings = ({
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: UseSettingsProps) => {
  const t = useTranslations("settings");
  const { theme, setTheme } = useTheme();
  const fontType = useLayoutStore((state) => state.fontType);
  const setFontType = useLayoutStore((state) => state.setFontType);
  const chartAnimationsEnabled = useLayoutStore(
    (state) => state.chartAnimationsEnabled,
  );
  const setChartAnimationsEnabled = useLayoutStore(
    (state) => state.setChartAnimationsEnabled,
  );
  const fixedNavbar = useLayoutStore((state) => state.fixedNavbar);
  const setFixedNavbar = useLayoutStore((state) => state.setFixedNavbar);
  const [internalOpen, setInternalOpen] = useState(false);

  /**
   * Controlled vs uncontrolled pattern: if the parent passes `open`,
   * we delegate state entirely to the parent. Otherwise we fall back
   * to local `useState` so the component can work standalone.
   */
  const isControlled = externalOpen !== undefined;
  const open = isControlled ? externalOpen : internalOpen;

  /** Delegates open/close to the parent (controlled) or local state (uncontrolled). */
  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (isControlled) {
        externalOnOpenChange?.(isOpen);
      } else {
        setInternalOpen(isOpen);
      }
    },
    [isControlled, externalOnOpenChange],
  );

  useEffect(() => {
    if (open) {
      document.body.style.setProperty("overflow", "hidden", "important");
    } else {
      document.body.style.removeProperty("overflow");
    }

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [open]);

  return {
    t,
    theme,
    setTheme,
    fontType,
    setFontType,
    chartAnimationsEnabled,
    setChartAnimationsEnabled,
    fixedNavbar,
    setFixedNavbar,
    open,
    setOpen: handleOpenChange,
  };
};
