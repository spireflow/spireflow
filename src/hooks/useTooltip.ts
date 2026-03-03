import { useEffect, useState } from "react";

/**
 * Manages tooltip visibility with automatic hide on outside click.
 *
 * @returns {Object} Tooltip state and control functions
 * @returns {boolean} isTooltipVisible - Current visibility state
 * @returns {Function} showTooltip - Show tooltip handler
 * @returns {Function} hideTooltip - Hide tooltip handler
 */
export const useTooltip = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const showTooltip = () => setIsTooltipVisible(true);
  const hideTooltip = () => setIsTooltipVisible(false);

  useEffect(() => {
    const handleDocumentClick = () => {
      // Hide the tooltip on document click
      hideTooltip();
    };

    // Listen for clicks on the document
    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return { isTooltipVisible, showTooltip, hideTooltip };
};
