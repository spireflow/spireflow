import type { RefObject } from "react";

import type { CustomDateRange } from "@/store/dateRangeStore";

export interface CustomDateRangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (range: CustomDateRange) => void;
  initialRange: CustomDateRange | null;
  returnFocusRef?: RefObject<HTMLButtonElement | null>;
}
