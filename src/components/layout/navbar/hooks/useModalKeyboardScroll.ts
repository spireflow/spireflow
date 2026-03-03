import { useCallback, useRef } from "react";

/** Number of pixels scrolled per arrow key press. */
const SCROLL_STEP = 60;

/**
 * Enables arrow-key scrolling inside modal dialogs.
 * Attach `scrollRef` to the scrollable container and pass `handleKeyDown`
 * to its `onKeyDown`. `handleOpenAutoFocus` prevents the dialog's default
 * auto-focus behavior and focuses the scroll container instead.
 */
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

  /**
   * Prevents Radix Dialog from auto-focusing its first focusable child.
   * Instead, focuses the scroll container so arrow keys work immediately.
   */
  const handleOpenAutoFocus = useCallback((e: Event) => {
    e.preventDefault();
    scrollRef.current?.focus();
  }, []);

  return { scrollRef, handleKeyDown, handleOpenAutoFocus };
};
