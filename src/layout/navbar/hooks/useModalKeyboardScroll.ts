import { useCallback, useRef } from "react";

const SCROLL_STEP = 60;

export const useModalKeyboardScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      scrollRef.current?.scrollBy({
        top: e.key === "ArrowDown" ? SCROLL_STEP : -SCROLL_STEP,
        behavior: "smooth",
      });
    }
  }, []);

  const handleOpenAutoFocus = useCallback((e: Event) => {
    e.preventDefault();
    scrollRef.current?.focus();
  }, []);

  return { scrollRef, handleKeyDown, handleOpenAutoFocus };
};
