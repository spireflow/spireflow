import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useState } from "react";

import { useAppStore } from "../../../store/appStore";

interface UseSettingsProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Aggregates all settings panel state (theme, font, chart animations, fixed navbar).
 * Supports both controlled and uncontrolled open/close — when `open` / `onOpenChange`
 * props are provided the component is controlled; otherwise an internal state is used.
 */
export const useSettings = ({
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: UseSettingsProps) => {
  const t = useTranslations("settings");
  const { theme, setTheme } = useTheme();
  const fontType = useAppStore((state) => state.fontType);
  const setFontType = useAppStore((state) => state.setFontType);
  const chartAnimationsEnabled = useAppStore(
    (state) => state.chartAnimationsEnabled,
  );
  const setChartAnimationsEnabled = useAppStore(
    (state) => state.setChartAnimationsEnabled,
  );
  const fixedNavbar = useAppStore((state) => state.fixedNavbar);
  const setFixedNavbar = useAppStore((state) => state.setFixedNavbar);
  const [internalOpen, setInternalOpen] = useState(false);

  /**
   * Controlled vs uncontrolled pattern: if the parent passes `open`,
   * we delegate state entirely to the parent. Otherwise we fall back
   * to local `useState` so the component can work standalone.
   */
  const isControlled = externalOpen !== undefined;
  const open = isControlled ? externalOpen : internalOpen;
  const setOpen = isControlled
    ? (externalOnOpenChange ?? (() => {}))
    : setInternalOpen;

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
    setOpen,
  };
};
