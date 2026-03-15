import { act, renderHook } from "@testing-library/react";

import { useCustomDateRangeDialog } from "../../../../components/layout/dateRangeSelect/useRangeSelect";

describe("useCustomDateRangeDialog", () => {
  const mockOnApply = vi.fn();
  const mockOnOpenChange = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-16T12:00:00"));
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("initializes with provided range", () => {
    const { result } = renderHook(() =>
      useCustomDateRangeDialog({
        initialRange: { from: "2026-01-15", to: "2026-02-20" },
        onApply: mockOnApply,
        onOpenChange: mockOnOpenChange,
      }),
    );

    expect(result.current.fromDate.getFullYear()).toBe(2026);
    expect(result.current.fromDate.getMonth()).toBe(0); // January
    expect(result.current.fromDate.getDate()).toBe(15);
    expect(result.current.toDate.getMonth()).toBe(1); // February
    expect(result.current.toDate.getDate()).toBe(20);
  });

  it("initializes with today when no range provided", () => {
    const { result } = renderHook(() =>
      useCustomDateRangeDialog({
        initialRange: null,
        onApply: mockOnApply,
        onOpenChange: mockOnOpenChange,
      }),
    );

    const today = new Date();
    expect(result.current.fromDate.getDate()).toBe(today.getDate());
    expect(result.current.toDate.getDate()).toBe(today.getDate());
  });

  it("normalizes from/to order on apply (swaps if from > to)", () => {
    const { result } = renderHook(() =>
      useCustomDateRangeDialog({
        initialRange: null,
        onApply: mockOnApply,
        onOpenChange: mockOnOpenChange,
      }),
    );

    // Set from AFTER to (reversed order)
    act(() => {
      result.current.setFromDate(new Date("2026-03-20T00:00:00"));
      result.current.setToDate(new Date("2026-03-05T00:00:00"));
    });

    act(() => {
      result.current.handleApply();
    });

    const appliedRange = mockOnApply.mock.calls[0][0] as {
      from: string;
      to: string;
    };
    // Should be normalized: from <= to
    expect(appliedRange.from <= appliedRange.to).toBe(true);
  });

  it("calls onOpenChange(false) after apply", () => {
    const { result } = renderHook(() =>
      useCustomDateRangeDialog({
        initialRange: { from: "2026-01-01", to: "2026-01-31" },
        onApply: mockOnApply,
        onOpenChange: mockOnOpenChange,
      }),
    );

    act(() => {
      result.current.handleApply();
    });

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it("resets dates to initial range when dialog opens", () => {
    const { result } = renderHook(() =>
      useCustomDateRangeDialog({
        initialRange: { from: "2026-01-15", to: "2026-02-20" },
        onApply: mockOnApply,
        onOpenChange: mockOnOpenChange,
      }),
    );

    // Change dates
    act(() => {
      result.current.setFromDate(new Date("2026-06-01T00:00:00"));
      result.current.setToDate(new Date("2026-06-30T00:00:00"));
    });

    // Simulate dialog re-opening
    act(() => {
      result.current.handleOpenChange(true);
    });

    // Should be reset to initial range
    expect(result.current.fromDate.getMonth()).toBe(0); // January
    expect(result.current.fromDate.getDate()).toBe(15);
  });

  it("applies correctly when from equals to (single day)", () => {
    const { result } = renderHook(() =>
      useCustomDateRangeDialog({
        initialRange: null,
        onApply: mockOnApply,
        onOpenChange: mockOnOpenChange,
      }),
    );

    const sameDate = new Date("2026-05-10T00:00:00");
    act(() => {
      result.current.setFromDate(sameDate);
      result.current.setToDate(sameDate);
    });

    act(() => {
      result.current.handleApply();
    });

    const appliedRange = mockOnApply.mock.calls[0][0] as {
      from: string;
      to: string;
    };
    expect(appliedRange.from).toBe(appliedRange.to);
  });

  it("fiveYearsAgo is 5 years before today", () => {
    const { result } = renderHook(() =>
      useCustomDateRangeDialog({
        initialRange: null,
        onApply: mockOnApply,
        onOpenChange: mockOnOpenChange,
      }),
    );

    const today = new Date();
    expect(result.current.fiveYearsAgo.getFullYear()).toBe(
      today.getFullYear() - 5,
    );
  });
});
