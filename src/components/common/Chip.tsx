interface ChipProps {
  label: string;
  onDelete: () => void;
}

/**
 * Small removable tag used to display a selected filter value.
 * Renders a rounded pill with a label and an "×" delete button.
 *
 * @component
 * @param {string} label - Text displayed inside the chip
 * @param {() => void} onDelete - Callback fired when the remove button is clicked
 *
 * @example
 * ```tsx
 * <Chip label="Color: Red" onDelete={() => removeFilter("color")} />
 * ```
 */
export const Chip = ({ label, onDelete }: ChipProps) => {
  return (
    <div
      className="inline-flex items-center bg-gray-200 rounded-full px-2 pl-4 py-1 text-xs sm:text-xs font-semibold !text-tableCellText !text-secondaryText mr-2 mb-2 h-8 pb-2 pt-1.5 border border-inputBorder bg-inputBg text-primaryText placeholder-secondaryText hover:!border-inputBorderHover transition hover:bg-inputBgHover hover:bg-outlinedButtonBgHover"
      aria-label={`Chip with label ${label}`}
    >
      {label}
      <button
        onClick={onDelete}
        className="ml-2 pt-0.5"
        aria-label={`Remove ${label}`}
      >
        <svg
          className="w-4 h-4 cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  );
};
