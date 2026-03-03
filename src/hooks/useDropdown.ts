import { useRef, useState } from "react";

import { useClickOutside } from "./useClickOutside";

/**
 * Dropdown state management with outside-click handling.
 *
 * @returns {Object} Dropdown state and controls
 * @returns {boolean} isOpen - Open state
 * @returns {Function} toggle - Toggle dropdown
 * @returns {Function} close - Close dropdown
 * @returns {Function} open - Open dropdown
 * @returns {RefObject} ref - Ref to attach to dropdown element
 */
export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prevIsOpen) => !prevIsOpen);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  useClickOutside(ref, close);

  return { isOpen, toggle, close, ref, open };
};
