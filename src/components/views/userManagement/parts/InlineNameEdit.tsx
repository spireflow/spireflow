"use client";

import { useEffect, useRef, useState } from "react";

interface InlineNameEditProps {
  name: string;
  isEditing: boolean;
  onSave: (value: string) => void;
  onCancel: () => void;
}

export const InlineNameEdit = ({
  name,
  isEditing,
  onSave,
  onCancel,
}: InlineNameEditProps) => {
  const [draft, setDraft] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      setDraft(name);
      requestAnimationFrame(() => inputRef.current?.select());
    }
  }, [isEditing, name]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const trimmed = draft.trim();
      if (trimmed.length > 0) {
        onSave(trimmed);
      }
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  const handleAccept = () => {
    const trimmed = draft.trim();
    if (trimmed.length > 0) {
      onSave(trimmed);
    }
  };

  return (
    <div className="h-5 flex items-center">
      {isEditing ? (
        <div className="flex items-center gap-1.5">
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={40}
            className="text-sm font-medium text-primaryText bg-transparent border-b border-inputBorderFocus outline-none h-5 leading-5 p-0 w-32"
          />
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleAccept}
            className="inline-flex items-center justify-center w-5 h-5 rounded text-greenBadgeText hover:bg-outlinedButtonBgHover transition-colors cursor-pointer shrink-0"
            aria-label="Accept"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="currentColor"
            >
              <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z" />
            </svg>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={onCancel}
            className="inline-flex items-center justify-center w-5 h-5 rounded text-redBadgeText hover:bg-outlinedButtonBgHover transition-colors cursor-pointer shrink-0"
            aria-label="Cancel"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="currentColor"
            >
              <path d="M12 10.586L16.95 5.636l1.414 1.414L13.414 12l4.95 4.95-1.414 1.414L12 13.414l-4.95 4.95-1.414-1.414L10.586 12 5.636 7.05l1.414-1.414L12 10.586z" />
            </svg>
          </button>
        </div>
      ) : (
        <span className="text-sm font-medium text-primaryText leading-5 block truncate">
          {name}
        </span>
      )}
    </div>
  );
};
