import { useEffect, useRef, useState } from "react";

/**
 * Modal state management with outside-click to close.
 *
 * @returns {Object} Modal state and controls
 * @returns {boolean} isOpen - Open state
 * @returns {Function} toggle - Toggle modal
 * @returns {Function} close - Close modal
 * @returns {RefObject} ref - Ref to attach to modal element
 */
export const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen(!isOpen);

  const close = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return { isOpen, toggle, close, ref };
};
