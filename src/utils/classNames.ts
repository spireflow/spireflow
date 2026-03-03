import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes with conflict resolution.
 * Combines clsx for conditional classes and tailwind-merge for deduplication.
 * Later classes override earlier ones (rightmost precedence).
 *
 * @param {...ClassValue[]} inputs - Class names, objects, arrays
 * @returns {string} Merged class string
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
