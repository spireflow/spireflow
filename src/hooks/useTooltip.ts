import { useEffect, useState } from "react";

/**
 * Manages tooltip visibility with automatic hide on outside click.
 *
 * @returns {boolean} isTooltipVisible - Current visibility state
 * @returns {Function} showTooltip - Show the tooltip
 * @returns {Function} hideTooltip - Hide the tooltip
 */
export const useTooltip = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const showTooltip = () => setIsTooltipVisible(true);
  const hideTooltip = () => setIsTooltipVisible(false);

  useEffect(() => {
    const handleDocumentClick = () => {
      hideTooltip();
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return { isTooltipVisible, showTooltip, hideTooltip };
};
