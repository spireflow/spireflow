import { act, renderHook } from "@testing-library/react";
import React from "react";

// Mock useNavbar to avoid its heavy dependency chain (useSession, useDropdown, etc.)
vi.mock("../../../../components/layout/navbar/hooks/useNavbar", () => ({
  useNavbar: () => ({ currentLanguage: "en" }),
}));

import { useSearchInput } from "../../../../components/layout/navbar/hooks/useSearchInput";

const createControls = (initialOpen = false) => {
  let isOpen = initialOpen;
  return {
    open: vi.fn(() => {
      isOpen = true;
    }),
    close: vi.fn(() => {
      isOpen = false;
    }),
    closeOthers: vi.fn(),
    get isOpen() {
      return isOpen;
    },
  };
};

const fireKey = (key: string) =>
  ({
    key,
    preventDefault: vi.fn(),
  }) as unknown as React.KeyboardEvent<HTMLInputElement>;

const typeSearch = (
  result: { current: ReturnType<typeof useSearchInput> },
  value: string,
) => {
  act(() => {
    result.current.handleSearchChange({
      target: { value },
    } as React.ChangeEvent<HTMLInputElement>);
  });
};

describe("useSearchInput", () => {
  beforeEach(() => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/" },
      writable: true,
    });
  });

  describe("section filtering", () => {
    it("filters sections by name (case insensitive) and returns empty for no match", () => {
      const controls = createControls(true);
      const { result } = renderHook(() => useSearchInput(controls));

      typeSearch(result, "revenue");
      expect(result.current.filteredSections.length).toBeGreaterThan(0);
      expect(
        result.current.filteredSections.every(
          (s) =>
            s.translatedSection.toLowerCase().includes("revenue") ||
            s.translatedPage.toLowerCase().includes("revenue") ||
            s.sectionTitleKey.toLowerCase().includes("revenue") ||
            s.pageTitleKey.toLowerCase().includes("revenue"),
        ),
      ).toBe(true);

      typeSearch(result, "xyznonexistent");
      expect(result.current.filteredSections).toHaveLength(0);
    });

    it("filters sections by page name", () => {
      const controls = createControls(true);
      const { result } = renderHook(() => useSearchInput(controls));

      typeSearch(result, "Analytics");
      expect(
        result.current.filteredSections.every(
          (s) => s.pageTitleKey === "analytics",
        ),
      ).toBe(true);
    });
  });

  describe("handleSearchChange", () => {
    it("updates searchText, resets highlight, opens dropdown and closes others", () => {
      const controls = createControls();
      const { result } = renderHook(() => useSearchInput(controls));

      typeSearch(result, "orders");

      expect(result.current.searchText).toBe("orders");
      expect(result.current.highlightedIndex).toBe(-1);
      expect(controls.open).toHaveBeenCalled();
      expect(controls.closeOthers).toHaveBeenCalled();
    });
  });

  describe("keyboard navigation", () => {
    it("Escape closes dropdown and resets highlight", () => {
      const controls = createControls(true);
      const { result } = renderHook(() => useSearchInput(controls));

      const event = fireKey("Escape");
      act(() => {
        result.current.handleKeyDown(event);
      });

      expect(controls.close).toHaveBeenCalled();
      expect(result.current.highlightedIndex).toBe(-1);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it("ArrowDown/Up navigates highlight within bounds", () => {
      const controls = createControls(true);
      const { result } = renderHook(() => useSearchInput(controls));

      // Filter to single result so we can test bounds
      typeSearch(result, "Calendar");
      const count = result.current.filteredSections.length;

      act(() => {
        result.current.handleKeyDown(fireKey("ArrowDown"));
      });
      expect(result.current.highlightedIndex).toBe(0);

      // Pressing down past the end should clamp
      for (let i = 0; i < count + 3; i++) {
        act(() => {
          result.current.handleKeyDown(fireKey("ArrowDown"));
        });
      }
      expect(result.current.highlightedIndex).toBe(count - 1);

      // ArrowUp back to 0, then stays at 0
      for (let i = 0; i < count + 3; i++) {
        act(() => {
          result.current.handleKeyDown(fireKey("ArrowUp"));
        });
      }
      expect(result.current.highlightedIndex).toBe(0);
    });

    it("ArrowDown/Enter open dropdown when closed", () => {
      const controls1 = createControls(false);
      const { result: r1 } = renderHook(() => useSearchInput(controls1));
      act(() => {
        r1.current.handleKeyDown(fireKey("ArrowDown"));
      });
      expect(controls1.open).toHaveBeenCalled();

      const controls2 = createControls(false);
      const { result: r2 } = renderHook(() => useSearchInput(controls2));
      act(() => {
        r2.current.handleKeyDown(fireKey("Enter"));
      });
      expect(controls2.open).toHaveBeenCalled();
    });

    it("ignores arrow keys when filtered sections is empty", () => {
      const controls = createControls(true);
      const { result } = renderHook(() => useSearchInput(controls));

      typeSearch(result, "zzzznoexist");

      const event = fireKey("ArrowDown");
      act(() => {
        result.current.handleKeyDown(event);
      });
      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });

  describe("handleSectionClick", () => {
    it("closes dropdown and scrolls to element when on same page", () => {
      const scrollIntoViewMock = vi.fn();
      const el = document.createElement("div");
      el.scrollIntoView = scrollIntoViewMock;
      el.id = "revenueOverTime";
      document.body.appendChild(el);

      const controls = createControls(true);
      const { result } = renderHook(() => useSearchInput(controls));

      const section = result.current.filteredSections.find(
        (s) => s.id === "revenueOverTime",
      );

      act(() => {
        result.current.handleSectionClick(section!);
      });

      expect(controls.close).toHaveBeenCalled();
      expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: "smooth" });
      document.body.removeChild(el);
    });
  });
});
