import { useEffect, useState } from "react";

/**
 * Tracks window dimensions with automatic updates on resize.
 * SSR-safe with initial dimensions set to 0.
 *
 * @returns {Object} Window dimensions
 * @returns {number} width - Current window width
 * @returns {number} height - Current window height
 */
export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowDimensions;
};
